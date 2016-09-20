define(['json!env.json','core','libs'],function(env){
	var app = angular.module('app',['app.core','app.libs'])
					 .constant("ENV",env)
					 .config(['$stateProvider','$urlRouterProvider','$httpProvider',function($stateProvider,$urlRouterProvider,$httpProvider){
					 	$httpProvider.interceptors.push('HttpInterceptorServices');
				 		$urlRouterProvider.otherwise('/flights');
					 }])
					 .run(['$rootScope','$state',function($rootScope,$state){
					 	$rootScope.$state = $state;
					 }]);
});