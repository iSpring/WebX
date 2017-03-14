function extendsClass(Child, Father) {
    //继承父类prototype中定义的实例属性和方法
    Child.prototype = Object.create(Father.prototype);
    Child.prototype.constructor = Child;

    //继承父类的静态属性和方法
    Object.keys(Father).forEach(function(key) {
        Child[key] = Father[key];
    });
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