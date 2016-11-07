define(['moment'],function(moment){
	var module = angular.module('app.core.flights.directives',[]);
	module.directive('flightDetail',function(){
		return {
			templateUrl : '../../flights/card.html',
			link : function(scope,element,attrs){

			}
		};
	});

	module.directive('carrierLogo',function(){
		return {
			templateUrl : '../../flights/carrier-logo.html',
			link : function(scope,element,attrs){
				scope.imageUrl = 'http://pics.avs.io/140/70/'+attrs.imageUrl+'.png';
			}
		};
	});

	module.directive('duration',function(){
		return {
			link : function(scope,element,attrs){
				var minutes = scope.$eval(attrs.duration),
					moment_duration = moment.duration(minutes,'minutes');
				element.append(moment_duration.humanize());
			}
		};
	});

	module.directive('formattedTime',function(){
		return {
			link : function(scope,element,attrs){
				var minutes = scope.$eval(attrs.formattedTime),
					moment_time = moment(minutes),
					format = scope.$eval(attrs.format);
				element.append(moment_time.format(format));
			}
		};
	});
});
