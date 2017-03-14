# JavaScript原型链以及ES3、ES5、ES6实现继承的不同方式

## 原型和原型链

执行代码`var o = new Object();`，此时o对象内部会存储一个指针，这个指针指向了Object.prototype，当执行`o.toString()`等方法（或访问其他属性）时，o会首先查看自身有没有该方法或属性，如果没有的话就沿着内部存储的指针找到`Object.prototype`对象，然后查看`Object.prototype`对象是否有对应名称的方法或属性，如果有就调用`Object.prototype`的方法或属性。**我们把这个指针叫做o对象的原型，你可以把它看做是Java类继承中的`super`关键字。**

ES3规范中定义了`Object.prototype.isPrototypeOf()`方法，该方法可以判断某个对象是不是另一个对象的原型。`Object.prototype.isPrototypeOf(o)`返回true值可以确定Object.prototype就是o对象的原型。在ES3规范中，不能直接读取o对象的原型，也就是o对象的原型看不见摸不着的。ES5.1规范定义了[Object.getPrototypeOf()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf)方法，通过该方法可以获取对象的原型。我们可以通过`Object.getPrototypeOf(o) === Object.prototype`再次验证Object.prototype就是o对象的原型。ES6规范更加直接，为对象添加了一个`__proto__`属性，通过这个属性就可以获得对象的原型，所以在支持`__proto__`的浏览器中，`o.__proto__ === Object.prototype`也会返回true。

当我们执行`var x = new X();`时，浏览器会执行`x.__proto__ = X.prototype`，**即实例化的对象的原型设置为对应的类的prototype对象，这一点很重要**。

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

## ES5实现继承

## ES6实现继承

## 参考
ES3 [Object.prototype.isPrototypeOf()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isPrototypeOf)

ES5.1 [Object.create()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create)

ES5.1 [Object.getPrototypeOf()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf)

ES6 [Object.setPrototypeOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf)

ES6 [Object.prototype__proto__](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/proto)
