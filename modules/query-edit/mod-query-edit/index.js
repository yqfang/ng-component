(function () {
    angular.module('mod-query-edit')
        .directive("modQueryEdit", function (MultiTransclude) {

            return {
                restrict: "EA",
                scope: {},
                transclude: true,
                link: function (scope, iElem, iAttrs, ctrl, transclude)  {
                    MultiTransclude.transclude(iElem, transclude);
                },
                templateUrl: 'modules/query-edit/mod-query-edit/mod-query-edit.html'
            }
        })
})()

