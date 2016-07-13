var maya = {};
;(function() {
	var app = angular.module("maya", ['ng-package','up-components', 'maya-modules','ui.codemirror']);
		app.run(function ($rootScope, $state, $stateParams, $http, $timeout) {
			   $rootScope.$state = $state;
			   $rootScope.$stateParams = $stateParams;
               $rootScope.role = "user";
               $http.get("menu").then(function(data){
                    $rootScope.role = data.data.userRole;
                });
				$rootScope.app = {
					name: "中国银联日常统计分析系统",
					menus: [
						{
							title: {
                                name: 'statistic',
                                value: '<span up-icon="fa-caret-down">统计分析</span>'
                            },

							items: [{
                                        name: 'edit',
                                        value: '<up-link up-rule-control module="edit" up-icon="fa-pencil-square-o" active-state="queryEdit" href="#/query/edit" name="查询编辑"/>'
                                    },
                                    {
                                        name: 'favor',
                                        value: '<up-link up-rule-control module="favor" up-icon="fa-folder-open-o" active-state="queryFavor" href="#/query/favor" name="我的收藏"/>'
                                    }]
						},
						{
							title: {
                                name: 'manage',
                                value: '<span up-icon="fa fa-caret-down">业务规则管理</span>'
                            },

							items: [
                                    {
                                        name: 'rule',
                                        value: '<up-link up-icon="fa-bar-chart" up-rule-control module="rule" active-state="configRule" href="#/config/rule" name="统计参数"/>'
                                    }]
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
