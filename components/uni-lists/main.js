angular.module('up-components')
.directive('uniLists',function(){
    return {
        restrict: "EA",
        compile: function(ele,attr){
            angular.element(ele).addClass('uni-lists');
        }
    }
})
.directive('uniCard',function(){
    return {
        restrict: "EA",
        compile: function(ele,attr){
            angular.element(ele).addClass('uni-card');
        }
    }
})
.directive('uniItem',function(){
    return {
        restrict: "EA",
        compile: function(ele,attr){
            angular.element(ele).addClass('uni-item');
        }
    }
})