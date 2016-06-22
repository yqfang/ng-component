angular.module("ui.table",[])
.directive("uiTable",function(){
	return {
		restrict: "EA",
		templateUrl: "components/ui-table/main.html",
		controller: function($scope){
			$scope.classes = ["active","success","waring","danger","info"];
		},
		scope: {
			titles: "=",
			lists: "=",
			opts: "="
		},
		link: function(){

		}
	}
})