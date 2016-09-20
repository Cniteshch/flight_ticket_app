define(['../controllers/flights.controllers','../services/flights.services','../directives/flights.directives'],function(){
	var module = angular.module('app.core.flights',['app.core.flights.controllers' , 'app.core.flights.services','app.core.flights.directives' ]);
	module.config(['$stateProvider',function($stateProvider){
		$stateProvider.state('flights',{
			url : '/flights',
			templateUrl : '../../flights/search.html',
			controller : 'FlightsSearchController',
			data : {
				pageTitle : 'Search Flights'
			}
		}).
		state('flights_search',{
			url : '/flights_search/:from/:to/:date/:passenger?max_price&currency',
			templateUrl : '../../flights/list.html',
			controller : 'FlightsListController',
			data : {
				pageTitle : ' List of Flights'
			}
		});
	}]);
});