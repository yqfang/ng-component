(function() {

	angular.module('view.framework', [])
	.directive("viewFramework", function() {
	return {
		templateUrl: "components/view-framework/main.html",
		controller: function($scope) {
			//basic
			$scope.config = {
				title: "中国银联统计分析查询dd平台",
                copyright: "Copyright © 2009-2016 中国银联版权所有",
				url: {
					dynamicRouter: 'components/dynamic-router/index.js',
					topbar: 'components/view-framework/topbar/maya-topbar.js',
					sidebar: 'components/view-framework/sidebar/maya-sidebar.js',
                    bottombar: ['components/view-framework/bottombar/maya-bottombar.js'],
				}
			}
			//sidebar
			angular.extend($scope.config, {
				navs: [
					{
                        'title': '统计分析',
                        show: true,
                        'navitems': [
                        {   state: 'home',
                            url: '/query/edit',
                            dir: 'query-edit',
                            name:'查询编辑'},
                        {	state: 'queryFavor',
                            url: '/query/favor',
                            dir: 'query-favor',
                            name:'我的查询',
                        }

						]
                    },
					{
                        'title': '系统管理',
                        show: true,
                        'navitems': [{
                            state: 'configAuth',
                            url: '/config/auth',
                            dir: 'config-auth',
                            name: '用户权限管理'},
                            {
                            state: 'configRule',
                            url: '/config/rule',
                            dir: 'config-rule',
                            name: '业务规则管理'}
                    ]}
				]
			})
		},
		link: function($scope) {

		},
		transclude: true
	}
})
})()

