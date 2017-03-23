//在worker中不能访问window对象，可以使用self，self是一个DedicatedWorkerGlobalScope对象
self.addEventListener("message", function(evt){
  var result = null;
  if(typeof evt.data === "string"){
    console.log("WebWorker工作线程收到主线程的字符串message: " + evt.data);
    result = evt.data.toUpperCase();

  }else{
    console.log("WebWorker工作线程收到主线程的对象message: " + JSON.stringify(evt.data));
    evt.data.msg = evt.data.msg.toUpperCase();
    result = evt.data;
  }

  //向self发送message
    self.postMessage(result);

}, false);