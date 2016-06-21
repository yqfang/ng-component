(function () {

    angular.module('mod-query-edit')
        .controller("queryEditCtrl", function(formMaker,queryEditHttp,$modal) {
            this.editorConfig = {lineNumbers: true,mode: "text/x-mariadb",theme: "twilight"};
            this.sqlContent = "";
            this.openStatistic = function(){
            	queryEditHttp.getBuss(1).then(function(data){
            		$modal.open({
            			templateUrl: "modules/query-edit/modal/statistic.html",
            			controller: "queryEditStatistic",
            			resolve: {
            				data: function(){
            					return data;
            				},
            				onOk: function(){
            					return function(){
            						console.log("ok");
            					}
            				}
            			}
            		})
            	})
            }
	    })
	    .controller("queryEditStatistic",function($scope,data,$modalInstance,onOk){
	    	$scope.title = "统计维度选择";
	    	$scope.data = data;
			$scope.ok = function(item,type){
				// 确定后要存储数据
				if(onOk){
					onOk();
					$modalInstance.close();
				} else {
					$modalInstance.close();
				}
				// var result = onOk(item,type);
				// if(result && result.then != null) {
				// 	result.then(function(data){
				// 		if(data == "SUCC"){
				// 			$modalInstance.close();
				// 		} else {
				// 			alert("存在错误");
				// 		}
				// 	})
				// } else {
				// 	$modalInstance.close();
				// }
			};
			$scope.cancel = function(){
				$modalInstance.dismiss();
			}
	    })

})()

