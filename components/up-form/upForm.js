;(function() {
	var self = angular.module("uForm", ['ui.bootstrap','ng.shims.placeholder','ngLocale']);

	self.directive("uFormGroup", function() {
		return {
			controller: function($scope, $attrs) {
				this.fields = $scope.$parent.$eval($attrs.fields) || $scope.$parent.$eval($attrs.fields + "=[]");;
				this.result = $scope.$parent.$eval($attrs.result) || $scope.$parent.$eval($attrs.result + "=[]");;
			},
			scope: {},
			template: '<div ng-transclude></div>',
			controllerAs: "uFormGroup",
			transclude: true
		}
	});
	self.directive("uForm", function($rootScope) {
		return {
			templateUrl: 'components/up-form/form-templates/myForm.html',
			transclude: true,
			restrict: "EA",
			controller: function($scope, $attrs, $rootScope) {
				var $parent = $scope.$parent;
				this.fields = $parent.$eval($attrs.fields);
				this.option = $parent.$eval($attrs.option);
				this.result = $parent.$eval($attrs.result) || $parent.$eval($attrs.result + "={}");
				this.btnHandler = function(field) {
					$parent.$eval($attrs.btnHandler, {field: field});
				}
			},
			scope: {},
			controllerAs: "form",
			require: ['?^uFormGroup'],
			link: function(scope, elem, attr, ctrls) {
				var uFormGroup = ctrls[0];
				uFormGroup && uFormGroup.fields && uFormGroup.fields.push(scope.form.fields);
				uFormGroup && uFormGroup.result && uFormGroup.result.push(scope.form.result);
			}
			
		}
	});
	angular.forEach({
		'input-text': 'appInputTextComponent',
		'input-url': 'appInputUrlComponent',
		'input-email': 'appInputEmailComponent',
		'input-date': 'appInputDateComponent',
		'input-time': 'appInputTimeComponent',
		'input-datetime': 'appInputDatetimeComponent',
		'input-multiple': 'appInputMultipleComponent',
		'input-password': 'appInputPasswordComponent',
		'input-checkbox': 'appInputCheckboxComponent',
		'input-radio': 'appInputRadioComponent',
		'input-submit': 'appInputSubmitComponent',
		'select': 'appSelectComponent',
		'textarea': 'appTextareaComponent',
		'button': 'appButtonComponent'
	}, function(directiveSelector, tpl) {
		self
		.directive(directiveSelector, function() {
		  return {
		  	restrict: 'EA',
		    controller: function($scope, $attrs) {
			    var directiveScope = $scope.$parent;
			    this.field = directiveScope.$eval($attrs.field);
			    this.ref = $scope;			     		   
  			},
		    controllerAs: 'componentCtrl',
		    templateUrl : 'components/up-form/field-templates/' + tpl + '.html',
		    scope: {"model": '='},
		    replace: true,
		    require: ['?^uForm'],
		    link: function(scope, elem, attr, ctrls) {
		    	var form = ctrls[0];
		    	scope.componentCtrl.onClickHandler = function(e, field) {
			   		e.preventDefault();
			   		e.stopPropagation()
			   		form.btnHandler(field);
			   	}
		    }
		  }
		})
	});
})();

