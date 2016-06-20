(function() {
	angular.module("view.framework")
	.directive("mayaSidebar", function() {
		return {
			restrict: "EA",
			templateUrl: "components/view-framework/sidebar/maya-sidebar.html",
			controller: function($scope) {
				$scope.toggle = function(list){
                    list.show = list.show != null ? !list.show : true;
				};
                $scope.chooseItem = function(item,key){
                    $scope.tempItem = $scope.tempItem != null ? $scope.tempItem : item;
                    $scope.tempItem.active = false;
                    item.active = true;
                    $scope.tempItem = item;
                    $scope.tempList = $scope.config.sidebar[key];
                    console.log(key);
                };
			},
			link: function(scope) {

			},
		}
	})
})()