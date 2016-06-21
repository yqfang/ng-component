var maya = {};
;(function() {
	var app = angular.module("maya", [ 'ngSanitize', 'uForm', 'ui.bootstrap','up-components', 'maya-modules', 'ui.router','ct.ui.router.extras', 'oc.lazyLoad']);
		app.run(function ($rootScope, $state, $stateParams) {
			   $rootScope.$state = $state;
			   $rootScope.$stateParams = $stateParams;
				$rootScope.app = {
					name: "中国银联参数统计平台",
					menus: [
						{
							name: '<span up-icon="fa-camera-retro fa-lg" up-icon-prepend>统计分析</span>',
							items: ['<up-link up-icon="fa-camera-retro" up-icon-prepend active-state="queryEdit" href="#/query/edit" name="查询编辑"/>',
								'<up-link up-icon="fa-camera-retro" up-icon-prepend active-state="queryFavor" href="#/query/favor" name="我的查询"/>']
						},
						{
							name: '<span up-icon="fa-camera-retro fa-lg" up-icon-prepend>业务规则管理</span>',
							items: ['<up-link up-icon="fa-camera-retro" up-icon-prepend active-state="configAuth" href="#/config/auth" name="权限管理"/>',
								'<up-link up-icon="fa-camera-retro" up-icon-prepend active-state="configRule" href="#/config/rule" name="统计参数"/>']
						}
					]
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
							"modules/query-edit/query-edit-desc/index.js"
						]
					}
				]
			});
			datepickerConfig.showWeeks = false;
		})
		app.config(function(datepickerConfig, $stateProvider, $urlRouterProvider) {
			datepickerConfig.showWeeks = false;
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
						}
					}
				})
				.state('queryFavor', {
					url: '/query/favor',
					template: '<div>我的查询</div>'
				})
				.state('configRule', {
					url: '/config/rule',
					template: '<div>业务规则管理</div>'
				})
				.state('configAuth', {
					url: '/config/auth',
					template: '<div>用户权限管理</div>'
				})
		})
})(maya)
