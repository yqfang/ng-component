;(function() {
	var app = angular.module("app", [ 'up-components'
		, 'modules', 'ng-package']);
		app.run(function ($rootScope, $state, $stateParams) {
			   $rootScope.$state = $state;
			   $rootScope.$stateParams = $stateParams;
				$rootScope.app = {
					name: "中国银联日常统计分析系统",
					menus: [
						{
							name: '<span up-icon="fa-caret-down">统计分析</span>',
							items: ['<up-link up-icon="fa-pencil-square-o" active-state="queryEdit" href="#/query/edit" name="查询编辑"/>',
								'<up-link up-icon="fa-folder-open-o" active-state="queryFavor" href="#/query/favor" name="我的收藏"/>']
						},
						{
							name: '<span up-icon="fa fa-caret-down">业务规则管理</span>',
							items: [
								'<up-link up-icon="fa-bar-chart" active-state="configRule" href="#/config/rule" name="统计参数"/>']
						}
					],
					currentModule: '<span up-icon="fa-pencil-square-o">查询编辑</span>'
				}
		    })
		app.config(function($ocLazyLoadProvider, datepickerConfig) {
			$ocLazyLoadProvider.config({
				debug: false,
				modules: [
					{
						name: "modal1",
						files: [

						]
					}
				]
			});
		})
		app.config(function($stateProvider, $urlRouterProvider) {
			$urlRouterProvider
				.when('/', '/query/edit')
				.otherwise('/query/edit');
			$stateProvider
				.state('queryEdit', {
					url: '/query/edit',
					template: '<div>modal1</div>',
					resolve: {
						currentModule: function($rootScope) {
							return $rootScope.app.currentModule = '<span up-icon="fa-pencil-square-o">modal1</span>';
						}		
					}
				})
				.state('queryFavor', {
					url: '/query/favor',
					template: '<div>modal2</div>',
					resolve: {
						currentModule: function($rootScope) {
							return $rootScope.app.currentModule = '<span up-icon="fa-folder-open-o">我的收藏</span>';
						},
					}
				})
				.state('configAuth', {
					url: '/config/auth',
					template: '<div>权限管理</div>',
					resolve: {
						currentModule: function($rootScope) {
							return $rootScope.app.currentModule = '<span up-icon="fa-key">权限管理</span>';
						}		
					}
				})
				.state('configRule', {
					url: '/config/rule',
					template: '<div>module4</div>',
					resolve: {
						currentModule: function($rootScope) {
							return $rootScope.app.currentModule = '<span up-icon="fa-bar-chart">统计参数</span>';
						}		
					}
				})
		})
		app.factory('httpInterceptor', [ '$q', '$injector',function($q, $injector) {
		        var httpInterceptor = {
		            'request' : function(config) {
		            	if(config.method == "POST" && !config.uni_obj) {
		            		config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
		            		config.transformRequest = function(obj){
			            		var str = [];
								for(var i in obj){
		                            if(typeof obj[i] == "object") {
		                                str.push(encodeURIComponent(i) + "=" + encodeURIComponent(angular.toJson(obj[i])));

		                            } else {
		                                str.push(i + "=" + obj[i]);
		                            }
								};
								return str.join("&");
			           		};
		            	}
		                return config;
		            },
		        }
		    return httpInterceptor;
		}])
		app.config(function($httpProvider){
			$httpProvider.interceptors.push('httpInterceptor');
			$httpProvider.defaults.withCredentials = true;
		})
		
})()
