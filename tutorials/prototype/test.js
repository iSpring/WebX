function extendsClass(Child, Father) {
    //ES3
    //继承父类prototype中定义的实例属性和方法
    // function ClassMiddle() {

    // }
    // ClassMiddle.prototype = Father.prototype;
    // Child.prototype = new ClassMiddle();
    // Child.prototype.constructor = Child;

    //继承父类的静态属性和方法
    // for (var p in Father) {
    //     if (Father.hasOwnProperty(p)) {
    //         Child[p] = Father[p];
    //     }
    // }

    //ES5.1
    //继承父类prototype中定义的实例属性和方法
    // Child.prototype = Object.create(Father.prototype);
    // Child.prototype.constructor = Child;

    //继承父类的静态属性和方法
    // Object.keys(Father).forEach(function(key) {
    //     Child[key] = Father[key];
    // });

    Child.prototype.__proto__ = Father.prototype;
    // Child.prototype.constructor = Child.constructor;

    //ES6
    //继承父类prototype中定义的实例属性和方法
    // Object.setPrototypeOf(Child.prototype, Father.prototype);
    //继承父类的静态属性和方法
    // Object.setPrototypeOf(Child, Father);
}

//---------------------------

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

//----------------------------------

function ClassB(name, age, job) {
    ClassA.apply(this, [name, age]);
    this.job = job;
}

extendsClass(ClassB, ClassA);

ClassB.prototype.sayJob = function() {
    console.log(this.job);
};