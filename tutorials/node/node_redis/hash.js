/**
 * https://redis.io/commands#hash
 * redis的value也可以是hash类型，类似于C#中的Dictionary。
 */
const redis = require('redis');
//http://redis.js.org/#api-rediscreateclient
//通过在options.password传入passowrd
const client = redis.createClient(6379, 'localhost', {
    password: 'xxx'
});
//也可以通过调用client.auth()方法设置密码
// client.auth('xxx');

client.on("error", function (err) {
   console.log("Error " + err);
});

//https://redis.io/commands/hmset
//hmset中的h表示要设置的值为hash类型，m表示要设置多个key-value
client.hmset('person1', {
    age: 28,
    sex: 'male'
});
//通过hmget可以获取指定多个字段的值
client.hmget('person1', ['age', 'sex'], function(err, value){
    if(err){
        console.error(err);
    }else{
        //输出: ['28', 'male']
        console.log(value);
    }
});


client.hgetall('person1', function(err, value){
    if(err){
        console.error(err);
    }else{
        //value是对象{"age": "28", "sex": "male"}
        console.log(`hgetall person1: ${JSON.stringify(value)}`);
    }
});


//https://redis.io/commands/hset
// client.hset('person1', 'name', 'sunqun'); //相当于执行client.hmset('person1', {name:'sunqun'})
// client.hget('person1', 'name', function(err, value){
//     if(err){
//         console.error(err);
//     }else{
//         console.log(`person1.name=${value}`);
//     }
// });

client.hmset('person2', {
    name: 'zhangsan',
    job: 'leader'
});

client.hkeys('person2', function(err, value){
    if(err){
        console.error(err);
    }else{
        //['name','job']
        console.log(value);
    }
});


//让person2在60秒后过期
client.expire('person2', 60);


client.hmset('person3', {
    name: 'lisi',
    job: 'teaching'
});
//删除person3中的job属性
client.hdel('person3', ['job']);

client.mget('not_exist_person', ['name'], function(err, value){
    if(err){
        console.error(err);
    }else{
        //value: [null, null]
        console.log(`not_exist_person value: ${value}, ${typeof value}`);
    }
});