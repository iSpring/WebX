﻿function add(a, b){
    var p = new Promise(function(resolve){
        setTimeout(function(){
            var c = a + b;
            resolve(c);
        }, 100);
    });
    return p;
}

function minus(a, b){
    var p = new Promise(function(resolve){
        var c = a - b;
        resolve(c);
    });
    return p;
}

function divide(a, b){
    var p = new Promise(function(resolve, reject){
        if(b === 0){
            reject("Can't be divided by zero")
        }
        var result = a / b;
        resolve(result);
    });
    return p;
}

add(1, 2).then(function(result){
    console.log("1 + 2 = " + result);
});

minus(10, 4).then(function(result){
    console.log("10 - 4 = " + result);
});

add(3, 4).then(function(result){
    return minus(result, 5);
}).then(function(result){
    console.log("3 + 4 - 5 = " + result);
});

add(4, 6).then(function(result){
    return result / 2;
}).then(function(result){
    console.log("(4 + 6) / 2 = " + result);
});

divide(1, 0).then(function(result){
    console.log("1 / 0 = " + result);
}, function(err){
    console.error(err);
});

divide(1, 0).then(function(result){
    console.log("1 / 0 = " + result);
}).then(undefined, function(err){
    console.error(err);
});

divide(1, 0).then(function(result){
    console.log("1 / 0 = " + result);
}).catch(function(err){
    console.error(err);
});


var p1 = add(1, 2);
var p2 = minus(5, 3);
Promise.all([p1, p2]).then(function(results){
    console.log("1 + 2 = " + results[0]);
    console.log("5 - 3 = " + results[1]);
});