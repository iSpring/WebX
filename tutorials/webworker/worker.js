//在worker中不能访问window对象，self是一个DedicatedWorkerGlobalScope对象
self.addEventListener("message", function(evt){
  console.log("WebWorker收到message: " + evt.data);
  var result = evt.data.toUpperCase();
  self.postMessage(result);
}, false);

