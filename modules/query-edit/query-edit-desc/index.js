/**
 * Created by qianzhixiang on 16/5/11.
 */
(function() {
    angular.module('mod-query-edit')
        .directive('queryEditDesc',function(formMaker){
            return {
                link: function(){

                },
                scope: {

                },
                controllerAs: 'queryEditTable',
                controller: function($scope){
                    this.fields = formMaker.getTableFliter().fields;
                    this.option = formMaker.getTableFliter().option;
                    this.submit = function name(valid, result) {
                        if(valid) {
                            console.info(result);
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
                    $scope.tableTitles = [{title: "任务描述",alias: "desc"},{title: "开始时间",alias: "startTime"},{title: "结束时间",alias: "endTime"},{title: "提交用户",alias: "submitUser"},{title: "查询状态",alias: "status"},{title: "结果",optName: "下载",optionAlias: "download",onclick: function(item,temp){/**download(item,temp)*/}},{title: "操作",optName: "查看日志",onclick: function(item){showLogs(item)}}];
                    $scope.results =  {
                        results: [{desc: "11月差错",submitTime: "2015-11-30","submitUser": "周星星","status": "正在运行"},{desc: "11月差错",submitTime: "2015-11-30","submitUser": "周星星","status": "正在运行"},{desc: "11月差错",submitTime: "2015-11-30","submitUser": "周星星","status": "正在运行"},{desc: "11月差错",submitTime: "2015-11-30","submitUser": "周星星","status": "正在运行"},{desc: "11月差错",submitTime: "2015-11-30","submitUser": "周星星","status": "正在运行"},{desc: "11月差错",submitTime: "2015-11-30","submitUser": "周星星","status": "正在运行"},{desc: "11月差错",submitTime: "2015-11-30","submitUser": "周星星","status": "正在运行"},{desc: "11月差错",submitTime: "2015-11-30","submitUser": "周星星","status": "正在运行"},{desc: "11月差错",submitTime: "2015-11-30","submitUser": "周星星","status": "正在运行"},{desc: "11月差错",submitTime: "2015-11-30","submitUser": "周星星","status": "正在运行"},],
                        pageAll: 100,
                        pageTemp: 1
                    };
                    $scope.classes = ["active","success"];
                },
                templateUrl: "modules/query-edit/query-edit-desc/main.html",
            }
        })
})()