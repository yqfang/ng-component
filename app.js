var maya = {};
;(function() {
	var app = angular.module("maya", [ 'ngSanitize', 'uForm', 'ui.bootstrap', 'up-components', 'maya-modules', 'ui.router','ct.ui.router.extras', 'oc.lazyLoad','ui.codemirror']);
		app.run(function ($rootScope, $state, $stateParams) {
			   $rootScope.$state = $state;
			   $rootScope.$stateParams = $stateParams;
				$rootScope.app = {
					name: "中国银联统计分析平台",
					menus: [
						{
							name: '<span up-icon="fa-caret-down">统计分析</span>',
							items: ['<up-link up-icon="fa-pencil-square-o" active-state="queryEdit" href="#/query/edit" name="查询编辑"/>',
								'<up-link up-icon="fa-folder-open-o" active-state="queryFavor" href="#/query/favor" name="我的收藏"/>']
						},
						{
							name: '<span up-icon="fa fa-caret-down">业务规则管理</span>',
							items: [
							// '<up-link up-icon="fa-key" active-state="configAuth" href="#/config/auth" name="权限管理"/>',
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
						name: "queryEdit",
						files: [
							"modules/query-edit/index.js",
							"modules/query-edit/mod-query-edit/index.js",
							"modules/query-edit/service/formMaker.js",
							"modules/query-edit/query-edit-desc/index.js",
							"modules/query-edit/service/HTTP.js"
						]
					}
				]
			});
			datepickerConfig.showWeeks = false;
			// datepickerPopupConfig.datepickerPopup = "yyyy-MM-dd";
		})
		app.config(function($stateProvider, $urlRouterProvider) {
			$urlRouterProvider
				.when('/', '/query/edit')
				.otherwise('/query/edit');
			$stateProvider
				.state('queryEdit', {
					url: '/query/edit',
					templateUrl: 'modules/query-edit/query-edit.html',
					controller: 'queryEditCtrl',
					controllerAs: 'queryEdit',
					resolve: {
						queryEdit: function($ocLazyLoad) {
							return $ocLazyLoad.load(["queryEdit"])
						},
						currentModule: function($rootScope) {
							return $rootScope.app.currentModule = '<span up-icon="fa-pencil-square-o">查询编辑</span>';
						}		
					}
				})
				.state('queryFavor', {
					url: '/query/favor',
					templateUrl: 'modules/query-favor/main.html',
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
					templateUrl: 'modules/config-rule/main.html',
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
		
})(maya)
