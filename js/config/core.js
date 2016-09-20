define(['../modules/flights.modules','../modules/airports.modules','config/http.interceptors.services','../modules/common.modules'],function(){
	var module = angular.module('app.core',['app.libs','app.core.flights','app.core.airports','app.core.http.interceptor.services','app.core.common']);
});