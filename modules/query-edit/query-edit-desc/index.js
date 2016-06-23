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
        .service('queryEditDescService',function(){
            var service = {
                result: {},
                transformDate: transformDate,
                scope: null,
            };
            return service;
        })
        .directive('queryEditDesc',function(formMaker,queryEditHttp,queryEditDescService){
            return {
                link: function(){

                },
                scope: {

                },
                controllerAs: 'queryEditTable',
                controller: function($scope, $http, $modal){
                    var me = this;
                    queryEditDescService.scope = $scope;
                    me.queryEditDescService = queryEditDescService;
                    this.fields = formMaker.getTableFliter().fields;
                    this.option = formMaker.getTableFliter().option;
                    this.result = {
                        startTime: new Date(),
                        endTime: new Date()
                    }
                    
                    this.downloadFile = function(path) {
                        if(path.indexOf('FILE://') === -1) {
				            path = 'FILE://' + path;
			            }
                        window.location.href = '/edwweb/tornado/TornadoServlet?action=downloadFile' + '&path=' + path;
			        }
                    function showLogs (params) {
                        $modal.open({
                          templateUrl: 'modules/query-edit/modal/log.html',
                          controller: 'queryEditLogCtrl',
                          resolve: {
                              params: function() {
                                  return params;
                              }
                          },
                          onOk: function() {

                        }

                    })}

                    this.submit = function name(valid, result,page) {
                        if(valid) {
                            var temp = {};
                            temp.startTime = transformDate(queryEditDescService.result.startTime);
                            temp.endTime = transformDate(queryEditDescService.result.endTime);
                            temp.pageNum = page != null ? page : 1;
                            temp.pageSize = 7;
                            temp.desc = queryEditDescService.result.desc == null ? "" : queryEditDescService.result.desc;
                            queryEditHttp.queryQueue(temp).then(function(data){
                                $scope.results = data;
                            })
                        }
                    }
                    this.submit(true, queryEditDescService.result,1);
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
                    function showSql(item){
                        alert('ok')
                    }
                    $scope.tableTitles = [{title: "任务描述",alias: "DESC"},{title: "开始时间",alias: "START_TIME"},{title: "结束时间",alias: "END_TIME"},{title: "提交用户",alias: "OPR_USER"},{title: "查询状态",alias: "TASK_ST"},{title: "结果",optName: "下载",optionAlias: "download",onclick: function(item,temp){/**download(item,temp)*/}},
                    {
                        title: "操作",optName: "日志",optionAlias: "showlogs",
                        opts: [
                        {optName: "日志",click: function(item){showLogs(item)}},
                        {optName: "SQL",click: function(item){showSql(item)}}]}];
                    $scope.pageChanged = function(){
                        me.submit(true,me.result,$scope.results['page']);
                    }
                    $scope.classes = ["active","success"];
                },
                templateUrl: "modules/query-edit/query-edit-desc/main.html",
            }
        })
})()