(function () {

    angular.module('mod-query-edit')
        .controller("promptController",function($scope,$modalInstance){
            $scope.data = "asd";
            $scope.done = function(){
                $modalInstance.close($scope.data);
            }; 
        })
        .factory("queryEditHttp", function($q,$http,$modal,dialogs) {
            var http = {};
            http.getBuss = function(type){
                var deferred = $q.defer();
                $http.get("para",{params:{bussType: type}}).then(function(data){
                    deferred.resolve(data.data);
                    // console.log(transformStaticData(data.data))
                });
                return deferred.promise;
            };
            http.getDimission = function(paraId){
                var deferred = $q.defer();
                $http.get("dimension",{params:{paraId: paraId}}).then(function(data){
                    deferred.resolve(data.data);
                    // console.log(transformStaticData(data.data))
                });
                return deferred.promise;
            };
            http.queryQueue = function(params){
                var deferred = $q.defer();
                $http.post("queryQueue",params).then(function(data){
                     deferred.resolve(data.data);
                })
                return deferred.promise;
            };
            function transformDate(date,seperate){
                if(seperate == null) {
                    seperate = "-";
                }
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var day = date.getDate();
                if(month < 10) {
                    month = "0" + month;
                }
                if(day < 10) {
                    day = "0" + day;
                }
                return "" + year + seperate + month + seperate + day;
            }
            function getSqlPostParams(lists,begin,end){
                var params = {
                    bussinessId: [],  //业务
                    outputId: [], // 指标
                    paraList: [], // 维度
                    startTime: transformDate(begin,""),
                    endTime: transformDate(end,"")
                };
                for(var i in lists) {
                    if(i == '1') {
                        // 维度
                        var result = [];
                        for(var key in lists[i]) {
                            var obj = {};
                            var arr = [];
                            for(var j in lists[i][key]['data']) {
                                var item = lists[i][key]['data'][j];
                                if(item.isChoosen) {
                                    arr.push(item.key);
                                }
                            };
                            if(arr.length > 0) {
                                obj.key = key;
                                obj.value = arr.join(";");
                                result.push(obj);
                            }
                        }
                        params.paraList = result;
                    } else {
                        var arr = [];
                        for(var j in lists[i]) {
                            var item = lists[i][j];
                            if(item.isChoosen) {
                                arr.push(item.paraId);
                            }
                        }
                        if(i == '2') {
                            params['bussinessId'] = arr.toString();
                        }
                        if(i == "3") {
                            params['outputId'] = arr.toString();
                        }
                    }
                }
                return params;
            }
            http.generate = function(lists,begin,end){
                var deferred = $q.defer();
                $http.post("analysis",getSqlPostParams(lists,begin,end), {uni_obj: true}).then(function(data){
                    deferred.resolve(data.data);
                })
                return deferred.promise;
            };
            http.exec = function(param){
                var deferred = $q.defer();
                $http.post("subSql",param).then(function(data){
                    deferred.resolve(data.data);
                })
                return deferred.promise;
            };
            http.store = function(content){
                var deferred = $q.defer();
                // {"storeContent": service.sqlContent},{uni_obj: true}
                var dlg = dialogs.create('modules/query-edit/service/prompt.html','promptController',{},{size:'lg'});
                dlg.result.then(function(name){
                    $http.post("newStore",{"storeContent": content,"storeNm": name ? name :"default"}).then(function(data){
                        deferred.resolve(data.data);
                    },function(){
                        deferred.reject();
                    })
                },function(){
                    deferred.reject();
                });
                return deferred.promise;
            }
            return http;
        })

})()

