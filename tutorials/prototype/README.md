# JavaScript原型链以及ES3、ES5、ES6实现继承的不同方式

## 原型链
JavaScript对于有基于类的语言经验的开发人员来说有点令人困惑 (如Java或C ++) ，因为它是动态的，并且本身不提供类实现。(在ES2015/ES6中引入了class关键字，但是只是语法糖，JavaScript 仍然是基于原型的)。

当谈到继承时，Javascript 只有一种结构：对象。每个对象都有一个内部链接到另一个对象，称为它的原型 prototype。该原型对象有自己的原型，等等，直到达到一个以null为原型的对象。根据定义，null没有原型，并且作为这个原型链 prototype chain中的最终链接。

JavaScript 对象有一个指向一个原型对象的链。当试图访问一个对象的属性时，它不仅仅在该对象上搜寻，还会搜寻该对象的原型，以及该对象的原型的原型，依此层层向上搜索，直到找到一个名字匹配的属性或到达原型链的末尾。

执行代码`var o = new Object();`，此时o对象内部会存储一个指针，这个指针指向了Object.prototype，当执行`o.toString()`等方法（或访问其他属性）时，o会首先查看自身有没有该方法或属性，如果没有的话就沿着内部存储的指针找到`Object.prototype`对象，然后查看`Object.prototype`对象是否有对应名称的方法或属性，如果有就调用`Object.prototype`的方法或属性。我们把这个指针叫做o对象的原型，你可以把它看做是Java类继承中的`super`关键字。

我们`Object.prototype.isPrototypeOf(o)`返回true值可以确定Object.prototype就是o对象的原型。`Object.prototype.isPrototypeOf()`方法是在ES3规范中定义的。在ES3规范中，不能直接读取o对象的原型，也就是o对象的原型看不见摸不着的。ES5.1规范定义了[Object.getPrototypeOf()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf)方法，我们可以通过`Object.getPrototypeOf(o) === Object.prototype`再次验证Object.prototype就是o对象的原型。ES6规范更加直接，为对象添加了一个`__proto__`属性，通过这个属性就可以获得对象的原型，所以在支持`__proto__`的浏览器中，`o.__proto__ === Object.prototype`也会返回true。


原型对象也有原型，这样追本溯源，一直找到Object.prototype，Object.prototype的原型是null，也就是Object.prototype没有原型。

## ES3实现继承

## ES5实现继承

## ES6实现继承

## 参考
ES3 [Object.prototype.isPrototypeOf()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isPrototypeOf)

ES5.1 [Object.create()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create)

ES5.1 [Object.getPrototypeOf()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf)

ES6 [Object.setPrototypeOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf)

ES6 [Object.prototype__proto__](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/proto)
