function objDeepCopy ( originObj ) {
    var newObj = Object.prototype.toString.call( originObj ) === '[object Array]' ? [] : {};
    if(typeof originObj !== 'object' || originObj === null) {
        // 不满足条件就直接返回原值
        return originObj;   
    } else if (window.JSON) {
        // 如果支持JSON的window全局方法，这种方式效率是最高的。
        newObj = JSON.parse(JSON.stringify(originObj));   
    } else {
        for(var property in obj){
            if(obj.hasOwnProperty(property)){
                newObj[property] = (typeof originObj[property] === 'object' && originObj[i] != null) ? objDeepCopy(originObj[property]) : originObj[property];
            }
        }
    }
    return newObj;
};