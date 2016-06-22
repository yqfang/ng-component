(function () {

    angular.module('mod-query-edit')
        .factory("queryEditHttp", function($q,$http) {
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
            }
            return http;
        })

})()

