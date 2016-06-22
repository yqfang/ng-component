/**
 * Created by qianzhixiang on 16/5/11.
 */
(function() {
    function transformDate(date){
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        if(month < 10) {
            month = "0" + month;
        }
        if(day < 10) {
            day = "0" + day;
        }
        return "" + year + "-" + month + "-" + day;
    }
    angular.module('mod-query-edit')
        .directive('queryEditDesc',function(formMaker,queryEditHttp){
            return {
                link: function(){

                },
                scope: {

                },
                controllerAs: 'queryEditTable',
                controller: function($scope, $http, $modal){
                    var me = this;
                    this.fields = formMaker.getTableFliter().fields;
                    this.option = formMaker.getTableFliter().option;
                    this.result = {
                        startTime: new Date(),
                        endTime: new Date()
                    }
                    function _getHiveInfo(serviceId, type, path){
                        return $http({
                            method: 'get',
                            url: 'TornadoServlet',
                            params: {
                                action: 'getHiveInfo',
                                serviceId: serviceId,
                                type: type,
                                filePath: path || ''
                            }
                        });
                    };
                    this.downloadFile = function(path) {
                        window.location.href = 'TornadoServlet?action=downloadFile' + '&path=' + path;
			        }
                    function showLogs (params) {
                        $modal.open({
                          templateUrl: 'modules/query-edit/modal/log.html',
                          controller: 'queryEditLogCtrl',
                          resolve: {
                              serviceId: params.AUTO_ID,
                                   path: params.LOG_PATH
                          },
                          onOk: function() {

                        }

                    })}
                        // _getHiveInfo(params.AUTO_ID, 1, params.LOG_PATH).then(function() {
                        //     dialogs.notify('日志详情', log.summary);
                        // }, function() {
                        //     dialogs.error('警告', '查看日志错误');
                        // });
                    this.submit = function name(valid, result,page) {
                        if(valid) {
                            var temp = {};
                            temp.startTime = transformDate(result.startTime);
                            temp.endTime = transformDate(result.endTime);
                            temp.pageNum = page != null ? page : 1;
                            temp.pageSize = 7;
                            temp.desc = result.desc;
                            queryEditHttp.queryQueue(temp).then(function(data){
                                $scope.results = data;
                                console.log(me.fields)
                            })
                        }
                    }
                	// $scope.dateFormat = "yyyy/MM/dd";
                    // $scope.endDate = new Date();
                	// $scope.beginDate = new Date($scope.endDate.getTime() - 7 * 24 * 3600 * 1000);
                    // $scope.isBeginDateOpen = false;
                    // $scope.isEndDateOpen = false;
                    // $scope.dateOptions = {
                    //     formatYear: 'yy',
                    //     startingDay: 1
                    // };
                    // $scope.toggleBegin = function($event) {
                    //     $event.preventDefault();
                    //     $event.stopPropagation();
                    //     $scope.isEndDateOpen = false;
                    //     $scope.isBeginDateOpen = !$scope.isBeginDateOpen
                    // };
                    // $scope.toggleEnd = function($event){
                    //     $event.preventDefault();
                    //     $event.stopPropagation();
                    //     $scope.isBeginDateOpen = false;
                    //     $scope.isEndDateOpen = !$scope.isEndDateOpen;
                    // };
                    // $scope.desc = "";
                    // $scope.search = function(){
                    //     // 进行查询
                    // };
                    $scope.tableTitles = [{title: "任务描述",alias: "DESC"},{title: "开始时间",alias: "START_TIME"},{title: "结束时间",alias: "END_TIME"},{title: "提交用户",alias: "OPR_USER"},{title: "查询状态",alias: "TASK_ST"},{title: "结果",optName: "下载",optionAlias: "download",onclick: function(item,temp){/**download(item,temp)*/}},{title: "操作",optName: "查看日志",onclick: function(item){showLogs(item)}}];
                    $scope.pageChanged = function(){
                        me.submit(true,me.result,$scope.results['page']);
                    }
                    $scope.classes = ["active","success"];
                },
                templateUrl: "modules/query-edit/query-edit-desc/main.html",
            }
        })
})()