(function () {
    angular.module('up-components')
        .factory("MultiTransclude", function () {
            return {
                transclude: function transclude(elem, transcludeFn) {
                    transcludeFn(function (clone) {
                        angular.forEach(clone, function (cloneEl) {
                            if (cloneEl.nodeName !== "#text") {
                                var targetName = cloneEl.attributes["transclude-to"].value;
                                var target = elem.find("[transclude-id='" + targetName + "']");
                                if (target.length) {
                                    target.append(cloneEl);
                                } else {
                                    cloneEl.remove();
                                    throw new Error("Target not found. Please specify the correct transclude-to attribute.");
                                }
                            }

                        })
                    })
                }
            }
        })
        .directive('bindHtmlCompile', ['$compile', function ($compile) {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    scope.$watch(function () {
                        return scope.$eval(attrs.bindHtmlCompile);
                    }, function (value) {
                        // In case value is a TrustedValueHolderType, sometimes it
                        // needs to be explicitly called into a string in order to
                        // get the HTML string.
                        element.html(value && value.toString());
                        // If scope is provided use it, otherwise use parent scope
                        var compileScope = scope;
                        if (attrs.bindHtmlScope) {
                            compileScope = scope.$eval(attrs.bindHtmlScope);
                        }
                        $compile(element.contents())(compileScope);
                    });
                }
            };
        }])

        .directive('scretch', function () {
            return {
                restrict: 'EA',
                link: function(scope, element, attrs) {
                    var value = 146;
                    attrs.scretch && (value = parseInt(attrs.scretch));
                    $(element).css('height', $(window).height() - value);
                    $(window).resize(function(){
                        $(element).css('height', $(window).height() - value);
                    });
                }
            };
        })
        .directive('activeState', function ($state) {
            return {
                restrict: 'EA',
                link: function(scope, element, attrs) {
                    var li = element.closest("li");
                    var val = attrs.activeState;
                    scope.$watch(function() {
                        return $state.current.name
                    }, function(value) {
                        val && (val === value) && li.addClass("active");
                        (!val || (val != value)) && li.removeClass("active");
                    })
                }
            };
        });






})();

