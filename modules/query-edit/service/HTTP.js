(function () {

    angular.module('mod-query-edit')
        .factory("queryEditHttp", function($q,$http) {
            var http = {};
            http.getBuss = function(type){
                var deferred = $q.defer();
                $http.get("para",{params:{bussType: type}}).then(function(data){
                    deferred.resolve(data);
                    // console.log(transformStaticData(data.data))
                });
                return deferred.promise;
            }
            return http;
        })

})()

