/**
 * Created by yqfang on 16/6/6.
 */
(function() {
    angular.module('up-components')
        .directive('upCollapse',function(){

            return {
                restrict: "EA",
                link: function(scope, ele, attr){
                    ele.on('click', function() {
                        ele.closest(".up-site--main").toggleClass('closed');
                    })

                }
            }
        })
})()

