(function() {
	angular.module('mod-query-edit')
		.controller('modQueryFavorCtrl', function($scope,modQueryFavorService) {
			modQueryFavorService.init().then(function(){
				$scope.service = modQueryFavorService;
			},function(){
				$scope.service = modQueryFavorService;
			})
		})
		.service('modQueryFavorService',function($http,$q,$modal){
			var service ={
				tempPage: 1,
				results: null,
				init: init,
				pageChanged: pageChanged,
				edit: function(item){
					var me = this;
					$modal.open({
	        			templateUrl: "modules/query-favor/modal/edit.html",
	        			controller: "queryFavorEditCtrl",
	        			resolve: {
	        				item: function(){
	        					return item;
	        				},
	        				parent: function(){
	        					return me;
	        				}
	        			}
	        		})
				},
				delete: function(item){
					var me = this;
					$http.get('delestore/' + item.storeId).then(function(){
						$http.get("store",{params: {page: me.tempPage}}).then(function(data){
							service.results = data.data;
						})
					})
				}
			};
			function init(){
				return initResults();
			}
			function initResults(){
				var deferred = $q.defer();
				$http.get("store").then(function(data){
					service.tempPage = 1;
					service.hasInited = true;
					service.results = data.data;
					deferred.resolve();
				},function(){
					deferred.reject();
				})
				return deferred.promise;
			};
			function pageChanged(){
				var me = this;
				$http.get("store",{params: {page: me.tempPage}}).then(function(data){
					service.results = data.data;
				})
			}
			return service;
		})
		.controller('queryFavorEditCtrl',function($scope,$modalInstance,item,parent,$http){
			$scope.editorConfig = {
                lineNumbers: true,
                mode: "text/x-mariadb",
                onLoad: function(cmInstance) {
                	 cmInstance.setOption('lineWrapping', true);
                    setTimeout(function() {
                        cmInstance.refresh();
                    }, 0);
                }
            };
            $scope.item = item;
            $scope.ok = function(){
            	$http.post("updateStore",item,{uni_obj: true}).then(function(data){
            		//重新获取一下
            		$http.get("store",{params: {page: parent.tempPage}}).then(function(){
            			$modalInstance.close();
            		},function(){
            			$modalInstance.close();
            		})
            	},function(){
            		$modalInstance.close();
            	})
            }
		})
})()
