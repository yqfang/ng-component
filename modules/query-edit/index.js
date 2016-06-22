(function () {

    angular.module('mod-query-edit')
        .controller("queryEditCtrl", function(formMaker,$rootScope, queryEditDescService,currentModule,queryEditHttp,$modal,$q) {
        	var me = this;
			$rootScope.app.currentModule = currentModule;
            this.editorConfig = {lineNumbers: true,mode: "text/x-mariadb",theme: "twilight"};
            this.sqlContent = "";
            this.lists = {
            	"1": {},
            	"2": null,
            	"3": null
            };
            queryEditDescService.result.endTime = new Date();
            queryEditDescService.result.startTime = new Date(queryEditDescService.result.endTime.getTime() - 7 * 24 * 3600 * 1000);
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
            };
            this.beginTime = null;
            this.beginOpened = true;
            this.endTime = null;
            this.dateOptions = {
                formatYear: 'yy',
                startingDay: 1
            };
            this.desc = "";
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
            function openChooseModal(id){
            	$modal.open({
        			templateUrl: "modules/query-edit/modal/choosen.html",
        			controller: "queryEditChoosen",
        			resolve: {
        				lists: function(){
        					return me.lists[id];
        				},
                        id: function(){
                            return id;
                        },
        				onOk: function() {
        					return function(){
        						var deferred = $q.defer();
        						deferred.resolve();
        						return deferred.promise;
        					}
        				},
        			}
        		})
            }
            this.openService = function(paraId){
            	if(!me.lists["" + paraId]) {
            		queryEditHttp.getBuss(paraId).then(function(data){
            			me.lists["" + paraId] = data;
            			openChooseModal(paraId+ "");
            		})
            	} else {
            		openChooseModal(paraId+"");
            	}
            };

            function openSearchModal(ifshow){
                $modal.open({
                    templateUrl: "modules/query-edit/modal/search.html",
                    controller: "queryEditSearch",
                    resolve: {  
                        lists: function(){
                            return me.lists;
                        },
                        ifshow: function(){
                            return ifshow;
                        },
                        onOk: function(){
                            return function(){

                            }
                        },
                        parent: function(){
                            return me;
                        },
                        afterExec: function(){
                            return function(){

                            }
                        }
                    }
                })
            }
            this.search = function(){
                openSearchModal(true);
            };
            this.highSearch = function(){
                 openSearchModal(false);
            };
            this.newSearch = function(){

            }
	    })
        .controller("queryEditSearch",function($scope,queryEditDescService,lists,$modalInstance,ifshow,queryEditHttp,formMaker,parent,afterExec){
            $scope.lists = lists;//getCalendar
            var me = this;
            $scope.ifshow = ifshow;
            if(ifshow) {
                $scope.title = "查询";
            } else {
                $scope.title = "新建查询";
            }
            $scope.editorConfig = {
                lineNumbers: true,
                mode: "text/x-mariadb",
                onLoad: function(cmInstance) {
                    setTimeout(function() {
                        cmInstance.refresh();
                    }, 0);
                }
            };
            $scope.sqlContent = "select * from qianzhixiang";
            $scope.dateOptions = {
                formatYear: 'yy',
                startingDay: 1
              };
            $scope.beginDate = {
                value: null,
                opened: false
            };
            $scope.endDate = {
                value: null,
                opened: false
            };
            $scope.generate = function(){
                queryEditHttp.generate(lists,$scope.beginDate.value,$scope.endDate.value).then(function(data){
                    $scope.sqlContent = data;
                })
            };
            $scope.exec = function(){
                var desc = parent.desc;
                var content = $scope.sqlContent;
                console.log(queryEditDescService);
                queryEditHttp.exec({
                    sql: content,
                    queryName: desc
                }).then(function(data){
                    queryEditHttp.queryQueue({
                        "desc": queryEditDescService.result.desc != null ? queryEditDescService.result.desc : "",
                        "pageNum":1,
                        "pageSize":7,
                        "startTime": queryEditDescService.transformDate(queryEditDescService.result.startTime),
                        "endTime": queryEditDescService.transformDate(queryEditDescService.result.endTime)
                    }).then(function(data){
                         queryEditDescService.scope.results = data;
                    })
                })

            };
            $scope.store = function(){
                 queryEditHttp.store($scope.sqlContent).then(function(data){
                    
                 })
            };
            $scope.close = function(){
                $modalInstance.close();
            }
        })
	    .controller('queryEditChoosen',function($scope,lists,id,$modalInstance){
	    	$scope.lists = lists;
            $scope.choosenItem = function(item){
                if(item) {
                    item.isChoosen = !item.isChoosen;
                }
            }
            $scope.title = (id == "2") ? "业务" : "指标";
            $scope.ok = function(){
                $modalInstance.close();
            }
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

