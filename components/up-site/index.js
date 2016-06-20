(function () {
    angular.module('up-components')
        .directive("upSite", function (MultiTransclude) {

            return {
                restrict: "EA",
                scope: {},
                transclude: true,
                link: function (scope, iElem, iAttrs, ctrl, transclude)  {
                    MultiTransclude.transclude(iElem, transclude);
                },
                templateUrl: 'components/up-site/up-site.html'
            }
        })
})()

