define(function(){
	var module = angular.module('app.core.airports.services',[]);
	module.factory('AirportsServices',['Restangular','ENV',function(Restangular,ENV){
		var airports_api = Restangular.withConfig(function(RestangularConfigurer){
			RestangularConfigurer.setBaseUrl('https://airports.p.mashape.com/');
			RestangularConfigurer.setDefaultHeaders({'X-Mashape-Key' : ENV.x_mashable_key});
		});
		var resource_url = '';
		return {
			search : function($value){
				return airports_api.all(resource_url).customPOST({ search : $value});
			}
		};
	}]);
});