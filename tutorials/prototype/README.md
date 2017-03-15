# JavaScript原型链以及ES3、ES5、ES6实现继承的不同方式

## 原型

执行代码`var o = new Object();`，此时o对象内部会存储一个指针，这个指针指向了Object.prototype，当执行`o.toString()`等方法（或访问其他属性）时，o会首先查看自身有没有该方法或属性，如果没有的话就沿着内部存储的指针找到`Object.prototype`对象，然后查看`Object.prototype`对象是否有对应名称的方法或属性，如果有就调用`Object.prototype`的方法或属性。**我们把这个指针叫做o对象的原型，你可以把它看做是Java类继承中的`super`关键字。**

ES3规范中定义了[Object.prototype.isPrototypeOf()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isPrototypeOf)方法，该方法可以判断某个对象是不是另一个对象的原型。`Object.prototype.isPrototypeOf(o)`返回true值可以确定Object.prototype就是o对象的原型。在ES3规范中，不能直接读取o对象的原型，也就是o对象的原型看不见摸不着的。ES5.1规范定义了[Object.getPrototypeOf()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf)方法，通过该方法可以获取对象的原型。我们可以通过`Object.getPrototypeOf(o) === Object.prototype`再次验证Object.prototype就是o对象的原型。ES6规范更加直接，为对象添加了一个`__proto__`属性，通过这个属性就可以获得对象的原型，所以在支持`__proto__`的浏览器中，`o.__proto__ === Object.prototype`也会返回true。

当我们执行`var x = new X();`时，浏览器会执行`x.__proto__ = X.prototype`，**即实例化的对象的原型设置为对应的类的prototype对象，这一点很重要**。

## 原型链

我们执行如下代码：
```
function Person(){};
var p = new Person();
```

`p.__proto__`指向了`Person.prototype`，`Person.prototype`的原型是`Person.prototype.__proto__`，其指向了`Object.prototype`，`Object.prototype.__proto__`为null。

通过`__proto__`向上追踪形成了如下的链式结构：
```
p -> Person.prototype -> Object.prototype -> null
```

**这一原型的链式结构就叫做原型链。Object.prototype的原型是null，也就是说Object.prototype没有原型。**

JavaScript 对象有一个指向一个原型对象的链。当试图访问一个对象的属性时，它不仅仅在该对象上搜寻，还会搜寻该对象的原型，以及该对象的原型的原型，依此层层向上搜索，直到找到一个名字匹配的属性或到达原型链的末尾。

JavaScript中的继承是通过原型实现的，虽然在ES6中引入了class关键字，但是它只是原型的语法糖，JavaScript 仍然是基于原型的。

## ES3实现继承

在JavaScript中，所谓的类就是函数，函数就是类。一般情况下，我们在函数的prototype上面定义方法，因为这样所有类的实例都可以公用这些方法；在函数内部（构造函数）中初始化属性，这样所有类的实例的属性都是相互隔离的。

我们定义ClassA和ClassB两个类，想让ClassB继承自ClassA。

ClassA代码如下所示：
```
function ClassA(name, age) {
    this.name = name;
    this.age = age;
}

ClassA.prototype.sayName = function () {
    console.log(this.name);
};

ClassA.prototype.sayAge = function () {
    console.log(this.age);
};
```

ClassA构造函数内部定义了`name`和`age`两个属性，并且在其原型上定义了`sayName`和`sayAage`两个方法。

ClassB如下所示：
```
function ClassB(name, age, job) {
    ClassA.apply(this, [name, age]);
    this.job = job;
}
```
ClassB新增了`job`属性，我们在其构造函数中执行`ClassA.apply(this, [name, age]);`，相当于在Java类的构造函数中通过`super()`调用父类的构造函数以初始化相关属性。

此时我们可以通过`var b = new ClassB("sunqun", 28, "developer");`进行实例化，并可以访问`b.name`、`b.age`、`b.job`三个属性，但此时b还不能访问ClassA中定义的`sayName`和`sayAage`两个方法。

然后我们新增代码`ClassB.prototype = ClassA.prototype;`，此时ClassB的代码如下所示：
```
function ClassB(name, age, job) {
    ClassA.apply(this, [name, age]);
    this.job = job;
}
//新增
ClassB.prototype = ClassA.prototype;
```

当执行`var b = new ClassB("sunqun", 28, "developer");`时，b.__proto__指向的是ClassB.prototype，由于通过新增的代码已经将`ClassB.prototype`指向了`ClassA.prototype`，所以此时b.__proto__指向了`ClassA.prototype`。这样当执行`b.sayName()`时，会执行`b.__proto__.sayName()`，即最终执行了`ClassA.prototype.sayName()`，这样ClassB的实例就能调用ClassA中方法了。

此时我们想为ClassB新增加一个`sayJob`方法用于输出`job`属性的值，如下所示：

```
function ClassB(name, age, job) {
    ClassA.apply(this, [name, age]);
    this.job = job;
}
ClassB.prototype = ClassA.prototype;
//新增
ClassB.prototype.sayJob = function(){
    console.log(this.job);
};
```

此时问题出现了，我们为`ClassB.prototype`添加`sayJob`方法时，其实修改了`ClassA.prototype`，这样会导致ClassA所有的实例也都有了`sayJob`方法，这显然不是我们期望的。

为了解决这个问题，我们再次修改ClassB的代码，如下所示：
```
function ClassB(name, age, job) {
    ClassA.apply(this, [name, age]);
    this.job = job;
}
// ClassB.prototype = ClassA.prototype;
//修改
ClassB.prototype = new ClassA();
ClassB.prototype.constructor = ClassB;
ClassB.prototype.sayJob = function(){
    console.log(this.job);
};
```

我们通过执行`ClassB.prototype = new ClassA();`将ClassA实例化的对象作为ClassB的prototype，这样ClassB仍然能够使用ClassA中定义的方法，但是`ClassB.prototype`已经和`ClassA.prototype`完全隔离了。我们的目的达到了，我们可以随意向`ClassB.prototype`添加我们想要的方法了。有个细节需要注意，`ClassB.prototype = new ClassA();`会导致`ClassB.prototype.constructor`指向ClassA的实例化对象，为此我们通过`ClassB.prototype.constructor = ClassB;`解决这个问题。

一切貌似完美的解决了，但是这种实现还是存在隐患。我们在执行`ClassB.prototype = new ClassA();`的时候，给ClassA传递的是空参数，但是ClassA的构造函数默认参数是有值的，可能会在构造函数中对传入的参数进行各种处理，传递空参数很有可能导致报错（当然本示例中的ClassA不会）。于是我们再次修改ClassB的代码如下所示：
```
function ClassB(name, age, job) {
    ClassA.apply(this, [name, age]);
    this.job = job;
}
//修改
function ClassMiddle() {

}
ClassMiddle.prototype = ClassA.prototype;
ClassB.prototype = new ClassMiddle();
ClassB.prototype.constructor = ClassB;
ClassB.prototype.sayJob = function () {
    console.log(this.job);
};
```

这次我们引入了一个不需要形参的函数`ClassMiddle`作为ClassB和ClassA之间的中间桥梁。
 1. `ClassMiddle.prototype = ClassA.prototype;`： 将`ClassMiddle.prototype`指向`ClassA.prototype`，这样ClassMiddle可以访问ClassA中定义的方法。
 2. `ClassB.prototype = new ClassMiddle();`： 将ClassMiddle的实例化对象赋值给ClassB.prototype，这样就相当于执行了`ClassB.prototype.__proto__ = ClassMiddle.prototype;`，所以ClassB就能使用ClassMiddle中定义的方法，又因为`ClassMiddle.prototype`指向了`ClassA.prototype`，所以`ClassB.prototype.__proto__`也指向了`ClassA.prototype`，这样ClassB能使用ClassA中定义的方法。

以上思路的精妙之处在于ClassMiddle是无参的，它起到了ClassB和ClassA之间的中间桥梁的作用。

现在我们为ClassA添加一些静态属性和方法，ClassA新增如下代码：
```
...

//为ClassA添加静态属性
ClassA.staticValue = "static value";

//为ClassA添加静态方法
ClassA.getStaticValue = function() {
    return ClassA.staticValue;
};
ClassA.setStaticValue = function(value) {
    ClassA.staticValue = value;
};
```

静态属性和方法不属于某一个实例，而是属于类本身。ClassA.prototype上面定义的方法是实例方法，不是静态的。静态属性和方法是直接添加在ClassA上的。

为了使ClassB也能继承ClassA的静态属性和方法，我们需要为ClassB添加如下代码：
```
...

//ClassB继承ClassA的静态属性和方法
for (var p in ClassA) {
    if (ClassA.hasOwnProperty(p)) {
        ClassB[p] = ClassA[p];
    }
}
```

我们最终可以将上述继承代码的公共部分抽离成一个extendsClass方法，如下所示：
```
function extendsClass(Child, Father) {
    //继承父类prototype中定义的实例属性和方法
    function ClassMiddle() {

    }
    ClassMiddle.prototype = Father.prototype;
    Child.prototype = new ClassMiddle();
    Child.prototype.constructor = Child;

    //继承父类的静态属性和方法
    for (var p in Father) {
        if (Father.hasOwnProperty(p)) {
            Child[p] = Father[p];
        }
    }
}
```

我们只需要执行`extendsClass(ClassB, ClassA);`就可以完成大部分继承的逻辑。

最终ClassA的完整代码如下所示：
```
function ClassA(name, age) {
    this.name = name;
    this.age = age;
}

ClassA.prototype.sayName = function() {
    console.log(this.name);
};

ClassA.prototype.sayAge = function() {
    console.log(this.age);
};

ClassA.staticValue = "static value";

ClassA.getStaticValue = function() {
    return ClassA.staticValue;
};

ClassA.setStaticValue = function(value) {
    ClassA.staticValue = value;
};
```

ClassB的完整代码如下所示：
```
function ClassB(name, age, job) {
    ClassA.apply(this, [name, age]);
    this.job = job;
}

extendsClass(ClassB, ClassA);

ClassB.prototype.sayJob = function() {
    console.log(this.job);
};
```

我们可以在控制台中进行一下简单测试：
<p align="center">
    <img src="https://github.com/iSpring/WebX/blob/master/tutorials/prototype/images/test1.png" />
</p>

## ES5实现继承
ES5.1规范中新增了[Object.create()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create)方法，该方法会传入一个对象，然后会返回一个对象，返回的对象的原型指向传入的对象，比如执行代码`var output = Object.create(input)`，相当于执行代码`output.__proto__ = input;`，output的原型是input。我们可以简化之前的代码，不再需要ClassMiddle，只需要执行`ClassB.prototype = Object.create(ClassA.prototype);`即可，相当于执行代码`ClassB.prototype.__proto__ = ClassA.prototype;`。

而且ES5.1中新增了[Object.keys()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)方法用以获取对象自身的属性数组，我们可以用该方法简化继承父类静态属性和方法的过程。

根据以上两点，我们修改extendsClass方法如下所示：

```
function extendsClass(Child, Father) {
    //继承父类prototype中定义的实例属性和方法
    Child.prototype = Object.create(Father.prototype);
    Child.prototype.constructor = Child;

    //继承父类的静态属性和方法
    Object.keys(Father).forEach(function(key) {
        Child[key] = Father[key];
    });
}
```

ClassA和ClassB的代码无需变化。

## ES6实现继承

## 参考
ES3 [Object.prototype.isPrototypeOf()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isPrototypeOf)

ES5.1 [Object.create()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create)

ES5.1 [Object.getPrototypeOf()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf)

ES6 [Object.setPrototypeOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf)

ES6 [Object.prototype__proto__](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/proto)
