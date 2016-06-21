(function () {

    angular.module('mod-query-edit')
        .controller("queryEditCtrl", function(formMaker,queryEditHttp,$modal,$q) {
        	var me = this;
            this.editorConfig = {lineNumbers: true,mode: "text/x-mariadb",theme: "twilight"};
            this.sqlContent = "";
            this.lists = {
            	"1": {},
            	"2": null,
            	"3": null
            };
            this.statisticData = null;
            this.isObjEmpty = function(value){
            	var len = 0;
            	for(var i in value) {
            		len++;
            	}
            	console.log(len);
            	return len == 0 ? true : false;
            };
            this.closeStatisticChooen = function(item){
            	item.isChoosen = false;
            }
            function openModal (data){
            	if(!me.temp.tempItem) {
            		me.temp.tempItem = data[0] ? data[0] : null;
            	}
            	$modal.open({
        			templateUrl: "modules/query-edit/modal/statistic.html",
        			controller: "queryEditStatistic",
        			resolve: {
        				data: function(){
        					return data;
        				},
        				lists: function(){
        					return me.lists["1"];
        				},
        				onOk: function() {
        					return function(){
        						var deferred = $q.defer();
        						console.log(me.lists)
        						deferred.resolve();
        						return deferred.promise;
        					}
        				},
        				temp: function(){
        					return me.temp;
        				}
        			}
        		})
            }
            this.temp = {tempItem: null};
            this.openStatistic = function(){
            	if(! me.statisticData) {
            		queryEditHttp.getBuss(1).then(function(data){
            			me.statisticData = data;
            			openModal(data);
            		})
            	} else {
            		openModal(me.statisticData);
            	}
            }
            function openChooseModal(data,id){
            	$modal.open({
        			templateUrl: "modules/query-edit/modal/choosen.html",
        			controller: "queryEditChoosen",
        			resolve: {
        				data: function(){
        					return data;
        				},
        				lists: function(){
        					return me.lists[id];
        				},
        				onOk: function() {
        					return function(){
        						var deferred = $q.defer();
        						console.log(me.lists)
        						deferred.resolve();
        						return deferred.promise;
        					}
        				},
        				temp: function(){
        					return me.temp;
        				}
        			}
        		})
            }
            this.store = {"2": null,"3":null};
            this.openService = function(paraId){
            	if(!me.store["" + paraId]) {
            		queryEditHttp.getBuss(paraId).then(function(data){
            			me.store["" + paraId] = data;
            			openChooseModal(data,paraId+ "");
            		})
            	} else {
            		openChooseModal(me.store["" + paraId],paraId+"");
            	}
            }
	    })
	    .controller('queryEditChoosen',function($scope,lists){
	    	$scope.lists = lists;
	    })
	    .controller("queryEditStatistic",function($scope,data,$modalInstance,onOk,lists,$http,queryEditHttp,temp){
	    	$scope.title = "统计维度选择";
	    	$scope.data = data;
	    	$scope.lists = lists;
	    	$scope.tempLists = null;
	    	$scope.choosenItemLeft = function(item){
	    		if(item) {
	    			if(temp.tempItem != item ) {
	    				temp.tempItem.isChoosen = false;
	    				temp.tempItem = item;
	    				item.isChoosen = true;
	    			} else {
	    				item.isChoosen = true;
	    			}
	    			if(!$scope.lists[item.paraId]) {
	    				queryEditHttp.getDimission(item.paraId).then(function(data){
		    				$scope.lists[item.paraId] = {
		    					item: item,
		    					data: data
		    				};
		    				$scope.tempLists = $scope.lists[item.paraId]['data'];
		    			})
	    			} else {
	    				$scope.tempLists = $scope.lists[item.paraId]['data'];
	    			}
	    		}
	    	}
			$scope.choosenItemLeft(temp.tempItem);
			$scope.choosenItemRight = function(item){
				console.log(item)
				if(item) {
					console.log(item)
					item.isChoosen = !item.isChoosen;
				}
			}
			$scope.ok = function(item,type){
				// 确定后要存储数据
				if(onOk){
					onOk().then(function(){
						$modalInstance.close();
					})
					
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

