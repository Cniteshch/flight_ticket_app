define(['moment'],function(moment){
	var module = angular.module('app.core.flights.controllers',[]);

	var DateController = function($scope){

		$scope.dateMap = {

		};
		$scope.open = function(key){
			$scope.dateMap[key] = !$scope.dateMap[key];
		};

	};
	module.controller('FlightsSearchController',['$scope','$state' ,'FlightsServices','AirportsServices',function($scope,$state,FlightsServices,AirportsServices){

		$scope.search = {
			passenger : '1'
		};
		$scope.lists = {};
		$scope.lists.recordPassengers = [
			{ name : '1' , value : '1' },
			{ name : '2' , value : '2' },
			{ name : '3' , value : '3' },
			{ name : '4' , value : '4' },
			{ name : '5' , value : '5' },
			{ name : '6' , value : '6' },
			{ name : '7' , value : '7' }
		];
		$scope.lists.recordCurrencies = [
			{ name : 'USD' , value : 'USD'},
			{ name : 'INR' , value : 'INR'},
			{ name : 'EUR' , value : 'EUR'},
			{ name : 'GBP' , value : 'GBP'},
			{ name : 'JPY' , value : 'JPY'}
		];


		angular.extend(this, new DateController($scope));


		$scope.airportSearch = function(value){
			return AirportsServices.search(value).then(function(response){
				return response;
			});
		};

		$scope.doSearch = function(form,data){
			if(form.$valid === true){
				var request_params = { 
					to : data.to.ac,
					from : data.from.ac,
					date : moment(data.date).format('YYYY-MM-DD'),
					passenger: data.passenger,
				};
				request_params.max_price = data.maxPrice;
				request_params.currency  = data.currency;
				$state.go('flights_search',request_params);				
			}
		};


	}]);

	module.controller('FlightsListController',['$scope','$state','$stateParams','FlightsServices',function($scope,$state,$stateParams,FlightsServices){
		var searchParams = {
			request : {
				passengers : {
					adultCount : $stateParams.passenger
				},
				slice : [
					{
						origin : $stateParams.from,
						destination : $stateParams.to,
						date : $stateParams.date
					}
				]				
			}
		};
		if($stateParams.max_price && $stateParams.currency){
			searchParams.request.maxPrice = $stateParams.currency + $stateParams.max_price;
		}
		$scope.trips = {};
		FlightsServices.search(searchParams).then(function(response){
			$scope.flightData = response;
			$scope.trips.flights = response.trips.tripOption;
		},function(response){
			alert("Failed to load data");
		});
		$scope.getCarrierName = function(carrier_code){
			return FlightsServices.getCarrierName($scope.flightData,carrier_code);
		};
		$scope.getAirportName = function(airport_code){
			return FlightsServices.getAirportName($scope.flightData,airport_code);
		};		
	}]);
});