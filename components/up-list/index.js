/**
 * Created by yqfang on 16/6/4.
 */

//usage: <up-list items="items" selected="selected" title="title" closable"/>
;(function () {
    angular.module('up-components')
        .directive("upList", function () {
            return {
                restrict: "EA",
                scope: {
                    items: "="
                },
                controllerAs: 'list',
                link: function (scope, elem, attrs)  {
                    attrs.name && (scope.name = scope.$parent.$eval(attrs.name));
                    scope.open = true;
                    attrs.hasOwnProperty('closable') && (scope.closable = true) && (scope.clickTitle = function() {scope.open = !scope.open;elem.toggleClass('closed')});
                },
                templateUrl: 'components/up-list/up-list.html'
            }
        })
})();

