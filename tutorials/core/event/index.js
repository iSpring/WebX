//https://www.teakki.com/p/57dfbf2ed3a7507f975f1ca8

window.EventUtils = {
    getEvent: function(e){
        e = e || window.event;
        if(!e.target){
            e.target = e.srcElement;
        }
        if(!e.stopPropagation){
            e.stopPropagation = function(){
                this.cancelBubble = true;
            };
        }
        if(!e.preventDefault){
            e.preventDefault = function(){
                this.returnValue = false;
            };
        }
        return e;
    },

    addEventListener: function(node, eventNameWithoutOn, listener){
        if(node.addEventListener){
            node.addEventListener(eventNameWithoutOn, listener, false);
        }else if(node.attachEvent){
            //IE8及以下浏览器处理
            var eventNameWithOn = 'on' + eventNameWithoutOn;
            if(node.attachEvent){
                node.attachEvent(eventNameWithOn, listener);
            }else{
                node[eventNameWithOn] = listener;
            }
        }
    },

    removeEventListener: function(node, eventNameWithoutOn, listener){
        if(node.removeEventListener){
            node.removeEventListener(eventNameWithoutOn, listener, false);
        }else if(node.detachEvent){
            var eventNameWithOn = 'on' + eventNameWithoutOn;
            node.detachEvent(eventNameWithOn, listener, false);
            node[eventNameWithOn] = null;
        }
    },

    stopPropagation: function(e){
        e = this.getEvent(e);
        if(e.stopPropagation){
            e.stopPropagation();
        }else{
            e.cancelBubble = true;
        }
    },

    preventDefault: function(e){
        e = this.getEvent(e);
        if(e.preventDefault){
            e.preventDefault();
        }else{
            e.returnValue = false;
        }
    }
};