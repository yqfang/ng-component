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
                    var afterText = attr.hasOwnProperty("upIconReverse");
                    //trick: timeout the dom update util the next digest so the innerHTMER will be prepared
                    $timeout(function(){
                        afterText ? (child.innerHTML = child.innerHTML + '&nbsp<i class="fa ' + attr['upIcon'] + '"></i>') : (child.innerHTML = '<i class="fa ' + attr['upIcon'] + '"></i>&nbsp' + child.innerHTML);
                    }, 0);
                }
            }
        })
})()

