/**
 * Created by yqfang on 16/6/5.
 */

(function() {
    angular.module('mod-query-edit', []);
    angular.module("maya-modules", ['mod-query-edit'])
	.directive('stRatio',function(){
        return {
          link:function(scope, element, attr){
            var ratio=+(attr.stRatio);
            element.css('width',ratio+'%');
          }
        };
    })
  .run(function($rootScope){
    $rootScope.filtWord = function(word){
      console.log(word);
      debugger;
    }
  })
})()
