(function() {
	angular.module('mod-query-edit', [])
		.controller('configRule', function($scope,$http,configRuleService,$q) {
			$scope.qe = configRuleService;
			if(!configRuleService.hasInited) {
				configRuleService.init();
				configRuleService.hasInited = true;
			}
		})
		.factory("$modalService",function($modal){
			var service = {};
			service.open = function(opts){
				var modalInstance = $modal.open({
			      templateUrl: opts.templateUrl,
			      controller: opts.controller ? opts.controller : "mayaEditModalController",
			      resolve: {
			        item: function () {
			          return opts.item;
			        },
			        onOk: function(){
			        	return opts.onOk;
			        },
			      }
			    });
			}
			return service;
		})
		.factory('configRuleService',function($q,$http,$modalService){
			var service = {};
			var ruleLists = [
				{name: "统计维度",bussId: 1},
				{name: "业务",bussId: 2},
				{name: "统计指标",bussId: 3},
			];
			var tableTitles = [
				{title: "名称",alias: "bussName"},
				{title: "ID",alias: "bussId"},
				{title: "类型",alias: "bussType"},
				{title: "joinRule",alias: "joinRule"},
				{title: "showRule",alias: "showRule"},
				{title: "sqlRule",alias: "sqlRule"},
				{title: "操作",alias: "opt"}
			];
			var opts = [
				{
					title: "修改",
					click: function(item){
						var clone_item = angular.copy(item);
						$modalService.open({
							templateUrl: "modules/config-rule/editModal.html",
							item: clone_item,
							onOk: function(){

							}
						})
					}
				},
				{
					title: "删除",
					click: function(item){

					}
				}
			];
			var getRuleLists = function(){
				var deferred = $q.defer();
				deferred.resolve(ruleLists);
				return deferred.promise;
			};
			var getTableTitles = function(){
				var deferred = $q.defer();
				deferred.resolve(tableTitles);
				return deferred.promise;
			};
			var getLists = function(item){
				var deferred = $q.defer();
				$http.get("bussList",{params: {bussId: item.bussId}}).then(function(data){
					deferred.resolve(data.data);
				});
				return deferred.promise;
			};
			function transformData(data,option){
				var arr = [];
				for(var i in data) {
					var tempObj = {};
					for(var key in option) {
						var value = option[key];
						if(!data[i][value]) {
							tempObj[key] = value;
						} else {
							tempObj[key] = data[i][value];
						}
					};
					arr.push(tempObj);
				}
				return arr;
			}
			var chooseBuss = function(item) {
				var deferred = $q.defer();
				service.tempBuss = item;
				if(service.tempBuss) {
					getLists(service.tempBuss).then(function(data){
						//加载当前的服务的列表
						service.tableLists = data;
						deferred.resolve();
					})
				}
				return deferred.promise;
			};
			var openModal = function(item){
				var clone_item = angular.copy(item);
				$modalService.open({
					templateUrl: "modules/config-rule/editModal.html",
					item: clone_item,
					controller: "mayaConfigRuleModalController",
					onOk: function(item,type){
						var deferred = $q.defer();
						if(type == "add") {
							//新增
							$http.post("newBuss",item,{uni_obj: true}).then(function(data){
								if(data && data.data == "SUCC") {
									//成功了
									getLists(service.tempBuss).then(function(data){
										//加载当前的服务的列表
										service.tableLists = data;
										deferred.resolve("SUCC");
									})
								} else {
									deferred.resolve("ERR")
								}
							})
						} else if(type == "edit"){
							//编辑
							$http.put("buss",item).then(function(data){
								if(data && data.data == "SUCC") {
									//成功了
									getLists(service.tempBuss).then(function(data){
										//加载当前的服务的列表
										service.tableLists = data;
										deferred.resolve("SUCC");
									})
								} else {
									deferred.resolve("ERR")
								}
							})
						}
						return deferred.promise;
					}
				})
			}
			var addItem = function(){
				openModal();
			};
			var editRow = function(row){
				openModal(row);
			}
			var deleteRow = function(row){
				$http.post("delBuss",row,{uni_obj: true}).then(function(data){
					if(data && data.data == "SUCC") {
						//成功了
						getLists(service.tempBuss).then(function(data){
							//加载当前的服务的列表
							service.tableLists = data;
						})
					}
				})
				//发送删除请求   请求成功后再重新获取数据
			}
			var dev = false;
			service.reset = function(){
				service.tableLists = null; // 展示的列表
				service.ruleLists = angular.copy(ruleLists); // 展示的规则列表
				service.tableTitles = angular.copy(tableTitles); // 标的标题
				service.tempBuss = null; //当前的服务，默认第一个
				service.opts = opts;
				service.addItem = addItem;
				service.chooseBuss = chooseBuss;
				service.editRow = editRow;
				service.deleteRow = deleteRow;
				service.hasInited = false;
			};
			service.init = function(){
				var me = this;
				var deferred = $q.defer();
				chooseBuss(service.ruleLists[0]).then(function(){
					deferred.resolve();
					me.hasInited = true;
				})
				return deferred.promise;
			};
			if(!service.hasInited) {
				service.reset();
			};
			return service;
		})
		.controller('mayaConfigRuleModalController',function($scope,$modalInstance,item,onOk){
			$scope.title = item && item.bussName ? item.bussName : "新增";
			if(!item) {
				$scope.isAdd = true;
				item = {
					bussName: "",
					bussType: "",
					bussId: "",
					joinRule: "",
					showRule: "",
					sqlRule: ""
				};
				$scope.type = "add";
			} else {
				$scope.type = "edit";
			}
			$scope.item = item;
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
			$scope.ok = function(item,type){
				// 确定后要存储数据
				var result = onOk(item,type);
				if(result && result.then != null) {
					result.then(function(data){
						if(data == "SUCC"){
							$modalInstance.close();
						} else {
							alert("存在错误");
						}
					})
				} else {
					$modalInstance.close();
				}
			};
			$scope.cancel = function(){
				$modalInstance.dismiss();
			}
		})
})()