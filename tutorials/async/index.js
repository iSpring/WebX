function add(a, b){
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
        setTimeout(function(){
            var c = a - b;
            resolve(c);
        }, 100);
    });
    return p;
}

add(1, 2).then(function(result){
    console.log("1 + 2 = " + result);
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

var p1 = add(1, 2);
var p2 = minus(5, 3);
Promise.all([p1, p2]).then(function(results){
    console.log("1 + 2 = " + results[0]);
    console.log("5 - 3 = " + results[1]);
});