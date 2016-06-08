/**
 * Created by yqfang on 16/6/4.
 */

//usage: <up-list items="items" selected="selected" title="title" closable"/>
(function () {
    angular.module('up-components')
        .directive("upApp", function () {
            return {
                restrict: "EA",
                scope: {},
                controllerAs: 'list',
                transclude: true,
                link: function (scope, elem, attrs)  {
                    attrs.name && (scope.name = scope.$parent.$eval(attrs.name));
                    attrs.menus && (scope.menus = scope.$parent.$eval(attrs.menus));
                },
                templateUrl: 'components/up-app/up-app.html'
            }
        })
})()

