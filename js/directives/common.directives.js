define(function(){
	var module = angular.module('app.core.common.directives',[]);
	module.directive('autocompleteRequired',function($timeout){
		var pool = null;
		return {
			require : 'ngModel',
			link 	: function(scope,element,attrs,ctrl){
				scope.$watch(attrs.ngModel,function(n){
					if(pool){
						$timeout.cancel(pool);
						pool = null;
					}
					pool = $timeout(function(){
						if(typeof n === 'string'){
							ctrl.$setValidity('autocompleteRequired',false);
						}else{
							ctrl.$setValidity('autocompleteRequired',true);
						}
						pool = null;
					},500);					
				});
			}
		};
	});
});