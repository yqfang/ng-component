/**
 * Created by yqfang on 16/6/4.
 */

// usage: <upLink href="#/" name="mainPage" />
(function () {
    angular.module('up-components')
        .directive("upLink", function () {
            return {
                restrict: "EA",
                scope: {},
                transclude: true,
                link: function(scope, elem, attrs) {
                    scope.href, scope.name = "";
                    attrs.href && (scope.href = attrs.href);
                    attrs.name && (scope.name = attrs.name);
                },
                templateUrl: 'components/up-link/up-link.html'
            }
        })
})()