angular.module('up-components')
.directive('modalResize',function(){
	return {
		restrict: "EA",
		link: function(scope,ele,attr){
			var width = attr['modalResizeWidth'];
			var height = attr['modalResizeHeight'];
			var a = document.getElementsByClassName("modal-dialog")
			if(a.length > 0) {
				a = a[0];
				a.style['width'] = width;
				a.style['height'] = height;
			}
		}
	}
});