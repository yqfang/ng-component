/**
 * Created by yqfang on 16/6/6.
 */
(function() {
    angular.module('up-components')
        .directive('upIcon',function($timeout){
            function  getInner(ele) {
                var child = ele.children();
                if(child.length > 0) {
                    return getInner(child);
                } else {
                    return ele;
                }
            }
            return {
                restrict: "EA",
                link: function(scope, ele, attr){
                    var child = getInner(ele)[0];
                    var  _append = attr.hasOwnProperty("upIconAppend");
                    var  _prepend = attr.hasOwnProperty("upIconPrepend");
                    var  _blank = _append ? parseInt(attr.upIconAppend) : 2;
                    var  _blankStr = "";

                    _blank = _prepend ? parseInt(attr.upIconPrepend) : _blank;
                    if(!_append && !_prepend) {
                        _append = false;
                        _prepend = true
                        _blank = 2;
                    }
                    if(!_blank || _blank < 2) {
                        _blank = 2;
                    }
                    while(_blank --) {
                        _blankStr += "&nbsp";
                    }
                    
                    //trick: timeout the dom update util the next digest so the innerHTMER will be prepared
                    $timeout(function(){
                        _append ? (child.innerHTML = child.innerHTML + _blankStr + '<i class="fa ' + attr['upIcon'] + '"></i>') : (child.innerHTML = '<i class="fa ' + attr['upIcon'] + '"></i>' + _blankStr + child.innerHTML);
                    }, 0);
                }
            }
        })
})()

