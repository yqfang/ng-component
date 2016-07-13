/**
 * Created by yqfang on 16/6/4.
 */

;(function () {
    angular.module('up-components')
        .directive("upRuleControl", function ($rootScope) {
            return {
                restrict: "EA",
                link: function(scope, elem, attrs) {
                    var m = attrs.module;
                    var rule = {
                        edit: {
                            admin: true,
                            guest: false,
                            user: true
                        },
                        favor: {
                            admin: true,
                            guest: false,
                            user: true
                        },
                        rule: {
                            admin: true,
                            guest: false,
                            user: false
                        }
                    }
                    scope.$watch(function() {
                        return $rootScope.role
                    }, function(value) {
                        if(!rule[m][value]) {
                            elem.remove();
                            scope.$destroy();
                        }

                        // elem.css('display', rule[m][value] ? '' : 'none')
                    })


                    // hide the element

                    // elem.css('display', value ? 'none' : '');
                    // delete the hide element from resutl
                }
            }
        })
})();
