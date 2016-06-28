(function () {

    angular.module('mod-query-edit')
        .controller("queryEditCtrl", function(formMaker,$rootScope, queryEditDescService,currentModule,queryEditHttp,$modal,$q,dialogs) {
        	var me = this;
			$rootScope.app.currentModule = currentModule;
            this.editorConfig = {lineNumbers: true,mode: "text/x-mariadb",theme: "twilight"};
            this.sqlContent = "";
            this.lists = {
            	"1": {},
            	"2": null,
            	"3": null
            };
            this.statisticLists = {};
            queryEditDescService.result.endTime = new Date();
            queryEditDescService.result.startTime = new Date(queryEditDescService.result.endTime.getTime() - 7 * 24 * 3600 * 1000);
            this.statisticData = null;
            this.isObjEmpty = function(value){
            	var len = 0;
            	for(var i in value) {
            		len++;
            	}
            	return len == 0 ? true : false;
            };
            this.closeStatisticChooen = function(item){
            	item.isChoosen = false;
                me.temp.tempIndexNum > 0 ? (me.temp.tempIndexNum--) : me.temp.tempIndexNum = 0;
               // if(me.statisticLists[item.parentItem.paraId]) {
               //  me.statisticLists[item.parentItem.paraId]--;
               //  if(me.statisticLists[item.parentItem.paraId] <= 0) {
               //      me.statisticLists[item.parentItem.paraId] = 0;
               //  }
               // }
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
                    size: 'lg',
        			resolve: {
        				data: function(){
        					return data;
        				},
        				lists: function(){
        					return me.lists["1"];
        				},
                        statisticLists: function(){
                            return me.statisticLists;
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
            this.temp = {tempItem: null,zhibiao: 0};
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
                        temp: function(){
                            return me.temp;
                        }
        			}
        		})
            }
            this.openService = function(paraId){
            	if(!me.lists["" + paraId]) {
            		queryEditHttp.getBuss(paraId).then(function(data){
            			me.lists["" + paraId] = data;
                        me.temp.tempBuss = "" + paraId;
            			openChooseModal(paraId+ "");
            		})
            	} else {
            		openChooseModal(paraId+"");
            	}
            };

            function openSearchModal(ifshow,data){
                $modal.open({
                    templateUrl: "modules/query-edit/modal/search.html",
                    controller: "queryEditSearch",
                    size: "lg",
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
                        statisticLists: function(){
                            return me.statisticLists;
                        },
                        parent: function(){
                            return me;
                        },
                        beginDate: function(){
                            return me.beginDate;
                        },
                        endDate: function(){
                            return me.endDate;
                        },
                        afterExec: function(){
                            return function(){

                            }
                        },
                        content: function(){
                            return data;
                        }
                    }
                })
            }
            this.beginDate = {
                value: new Date(),
                opened: false
            };
            this.endDate = {
                value: new Date(),
                opened: false
            };
            this.dateOptions = {
                formatYear: 'yy',
                startingDay: 1
              };
            this.search = function(){
                if(me.beginDate.value && me.endDate.value && me.beginDate.value instanceof Date && me.endDate.value instanceof Date) {
                   if(me.temp.tempIndexNum > 0) {
                        queryEditHttp.generate(me.lists,me.beginDate.value,me.endDate.value).then(function(data){
                            openSearchModal(true,data);
                        })
                   } else {
                        dialogs.error('错误','`指标`选项为必选',"sm");
                   }
                } else {
                   dialogs.error('错误','没有选择时间或者时间格式错误',"sm");
                }
                
            };
            this.highSearch = function(){
                 openSearchModal(false);
            };
            this.newSearch = function(){
                me.lists = {
                    "1": {},
                    "2": null,
                    "3": null
                };
                me.statisticLists = {};
                me.desc = "";
                me.temp = {};
                dialogs.notify("提示", "清空成功", "sm")
            }
	    })
        .controller("queryEditSearch",function($scope,queryEditDescService,lists,$modalInstance,ifshow,queryEditHttp,formMaker,parent,afterExec,content,statisticLists,beginDate,endDate,dialogs){
            $scope.lists = lists;//getCalendar
            var me = this;
            $scope.ifshow = ifshow;
            $scope.statisticLists = statisticLists;
            $scope.beginDate = beginDate;
            $scope.endDate = endDate;
            if(ifshow) {
                $scope.title = "查询";
            } else {
                $scope.title = "新建查询";
            }
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
            $scope.sqlContent = content ? content : "";
            $scope.generate = function(){
                queryEditHttp.generate(lists,$scope.beginDate.value,$scope.endDate.value).then(function(data){
                    $scope.sqlContent = data;
                })
            };
            $scope.exec = function(){
                var desc = parent.desc;
                var content = $scope.sqlContent;
                queryEditHttp.exec({
                    sql: content,
                    queryName: desc
                }).then(function(data){
                    $modalInstance.close();

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
                    dialogs.notify('提示','收藏成功',"sm");
                 },function(){
                    dialogs.error('提示','收藏失败',"sm");
                 })
            };
            $scope.close = function(){
                $modalInstance.close();
            }

        })
	    .controller('queryEditChoosen',function($scope,lists,id,$modalInstance,temp){
	    	$scope.lists = lists;
            $scope.choosenItem = function(item){
                if(item) {
                    item.isChoosen = !item.isChoosen;
                    if(temp.tempBuss == "3") {
                        // 是指标
                        temp.tempIndexNum = temp.tempIndexNum ? temp.tempIndexNum : 0;
                        if(item.isChoosen) {
                            temp.tempIndexNum++;
                        } else {
                            temp.tempIndexNum--;
                            if(temp.tempIndexNum < 0) {
                                temp.tempIndexNum = 0;
                            }
                        }
                    }
                }
            }
            $scope.title = (id == "2") ? "业务" : "指标";
            $scope.ok = function(){
                $modalInstance.close();
            }
	    })
        .controller("showSqlCtrl", function($scope, $modalInstance, params) {
            $scope.sql = params.SQL_DESC;
            $scope.editorConfig = {
                lineNumbers: true,
                mode: "text/x-mariadb",
                readOnly: true,
                onLoad: function(cmInstance) {
                    cmInstance.setOption('lineWrapping', true);
                    setTimeout(function() {
                        cmInstance.refresh();
                    }, 0);
                }
            };
            $scope.ok = function() {
				$modalInstance.close();

			}
        })
		.controller("queryEditLogCtrl", function($interval,$timeout,$http,$scope,$modalInstance, params) {
			var stopInterval;
			var logPath = params.LOG_PATH;
			if(logPath.indexOf('FILE://') === -1) {
				logPath = 'FILE://' + logPath;
			}
			$scope.preview = {};
			function _getHiveInfo(serviceId, type, path){
                        return $http({
                            method: 'get',
                            url: '/edwweb/tornado/TornadoServlet',
                            params: {
                                action: 'getHiveInfo',
                                serviceId: serviceId,
                                type: type,
                                filePath: path || ''
                            }
                        });
            };
			function _getLogSucc(res) {
				res = res.data.obj;
				$scope.preview.content = res.content;
				if(res.status != 'RN' && res.status != 'SR' && res.status != 'TR') {
					if (angular.isDefined(stopInterval)) {
						$interval.cancel(stopInterval);
						stopInterval = undefined;
					}
				}
			}
			function _getLogFail(msg) {
				if (angular.isDefined(stopInterval)) {
					$interval.cancel(stopInterval);
					stopInterval = undefined;
				}
				$scope.preview.content = '运行出错，请联系管理员！\n';
			}
			_getHiveInfo(params.AUTO_ID, 1, logPath).then(_getLogSucc, _getLogFail);
			stopInterval = $interval(function(){
				_getHiveInfo(params.AUTO_ID, 1, logPath).then(_getLogSucc, _getLogFail);
			}, 3000);
			$scope.ok = function() {
				$modalInstance.close();
				if (angular.isDefined(stopInterval)) {
                $interval.cancel(stopInterval);
                stopInterval = undefined;
            }
			}

		})
	    .controller("queryEditStatistic",function($scope,data,$modalInstance,onOk,lists,$http,queryEditHttp,temp, statisticLists){
	    	$scope.title = "统计维度选择";
	    	$scope.data = data;
	    	$scope.lists = lists;
	    	$scope.tempLists = null;
            // 数组对象，作用和lists类似
            $scope.statisticLists = statisticLists;
	    	$scope.choosenItemLeft = function(item){
	    		if(item) {
                    if(!item.hasChoosen) {
                        item.hasChoosen = true;
                    }
	    			if(temp.tempItem != item ) {
	    				temp.tempItem.isChoosen = false;
	    				temp.tempItem = item;
	    				item.isChoosen = true;
	    			} else {
	    				item.isChoosen = true;
	    			}
                    // 判断当前选中的这个item是否存在过
                    if(!$scope.statisticLists[item.paraId]) {
                        $scope.statisticLists[item.paraId] = 0;
                    };
	    			if(!$scope.lists[item.paraId]) {
                        // 根据左边的选择获取对应的信息并展示在右边
	    				queryEditHttp.getDimission(item.paraId).then(function(data){
                            //lists 存储的是选择过的
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
				if(item) {
                    if(!item.parentItem) {
                        item.parentItem = temp.tempItem;
                    }
					item.isChoosen = !item.isChoosen;
                    if(!$scope.statisticLists[temp.tempItem.paraId]) {
                        $scope.statisticLists[temp.tempItem.paraId] = 0;
                    };
                    if(item.isChoosen) {
                        $scope.statisticLists[temp.tempItem.paraId]++;
                    } else {
                        $scope.statisticLists[temp.tempItem.paraId]--;
                        if($scope.statisticLists[temp.tempItem.paraId] <= 0) {
                            $scope.statisticLists[temp.tempItem.paraId] = 0;
                        }
                    }
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

