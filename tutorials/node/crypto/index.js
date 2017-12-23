/**
 * node.js的crypto在0.8版本并没有改版多少，这个模块的主要功能是加密解密。
   node利用 OpenSSL库来实现它的加密技术，这是因为OpenSSL已经是一个广泛被采用的加密算法。
   它包括了类似MD5、SHA-1、SHA256、SHA512 算法，这些算法你可以利用在你的应用中。
 */

const crypto = require('crypto');

//使用md5加密
let a = crypto.createHash('md5');//指定加密算法
a.update('sunqun');//传入待加密内容
console.log(a.digest().toString('utf8'));//生成摘要

console.log('----------------------------------');

//使用sha1加密
let b = crypto.createHash('sha1');
b.update('sunqun');
console.log(b.digest().toString('utf8'));

console.log('----------------------------------');

//使用sha256加密
let c = crypto.createHash('sha256');
c.update('sunqun');
console.log(c.digest().toString('utf8'));

console.log('----------------------------------');

//使用sha512加密
let d = crypto.createHash('sha512');
d.update('sunqun');
console.log(d.digest().toString('utf8'));

//P189,使用密钥对sessionId（口令）进行加密,只要密钥不被攻击者知道就安全
//将值通过私钥签名，由.分割原值和签名
var sign = function(val, secret){
   return val + '.' + crypto.createHmac('sha256', secret).update(val).digest('base64').replace(/\=+$/, '');
}
//取出口令部分进行签名，对比用户提交的值，验证sessionId的合法性
var unsign = function(val, secret){
   var str = val.slice(0, val.lastIndexOf('.'));
   return sign(str, secret) === val ? str : false;
}
