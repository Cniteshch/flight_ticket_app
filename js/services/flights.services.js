define(['moment'],function(moment){
	/**
	 * Class for slice , adds useful functions to slice
	 * @constructor
	 * @param {Object} data slice data received from server
	 * @returns {Object} Slice Object with data
	 */
	function Slice(data){
		return angular.extend(this,data);
	}

	/**
	 * Returns the number of stops in a slice
	 * @return {int} count of number of stops
	 */
	Slice.prototype.getTripCount = function(){
		var count = 0 ;
		this.slice[0].segment.forEach(function(seg){
			count += seg.leg.length;
		});
		return count - 1 ;
	};

	/**
	 * Returns sales total of a slice for all passengers
	 * @return {Object} Object containin sale total and currency
	 */
	Slice.prototype.getSaleTotal = function(){
		var saleTotal = this.pricing[0].saleTotal;
		return {
			currency : saleTotal.substr(0,3),
			amount 	 : saleTotal.substr(3)
		};
	};

	/**
	 * Returns the arrival date for the slice
	 * @return {Object} moment object of arrival date
	 */
	Slice.prototype.getArrivalDate = function(){
		var segment = this.slice[0].segment,
			seg_length = segment.length,
			leg = segment[segment.length -1 ].leg,
			leg_length = leg.length;
		return moment(leg[leg_length-1].arrivalTime);
	};

	/**
	 * Returns the departure date for the slice
	 * @return {Object} moment object of departure date
	 */
	Slice.prototype.getDepartureDate = function(){
		return moment(this.slice[0].segment[0].leg[0].departureTime);
	};

	/**
	 * Returns code of all stops in this slice 	
	 * @return {String[]} Array of codes
	 */
	Slice.prototype.getStops = function(){
		var legs = this.getLegs(),
			cities = [legs[0].origin];
		legs.forEach(function(leg){
			cities.push(leg.destination);
		});
		return cities;
	};

	/**
	 * Returns every leg in this slice in a single array
	 * @return {Object[]} Array of legs
	 */
	Slice.prototype.getLegs = function(){
		var legs = [];
		this.slice[0].segment.forEach(function(segment){
			segment.leg.forEach(function(leg){
				leg.flight = segment.flight;
				legs.push(leg);
			});
		});
		return legs;
	};

	/**
	 * Returns all carriers in this slice
	 * @return {String[]} Array of carriers
	 */
	Slice.prototype.getCarriers = function(){
		var carriers = [];
		this.slice[0].segment.forEach(function(segment){
			carriers.push(segment.flight.carrier);
		});
		return _.uniq(carriers);
	};

	var module = angular.module('app.core.flights.services',[]);
	module.factory('FlightsServices', ['$filter','Restangular','ENV', function($filter,Restangular,ENV){
		var qpx_api = Restangular.withConfig(function(RestangularConfigurer){
			RestangularConfigurer.setBaseUrl('https://www.googleapis.com/qpxExpress/v1/trips');
			RestangularConfigurer.setDefaultRequestParams({key : ENV.qpx_key });
		});
		var resource_url = 'search';
		return {
			/**
			 * Searches the qpx api for the input search data
			 * @param  {Object} data search data
			 * @return {Object}      Promise object
			 */
			search : function(data){
				return qpx_api.all(resource_url).post(data).then(function(response){
					response.trips.tripOption.forEach(function(tP,index){
						response.trips.tripOption[index] = new Slice(response.trips.tripOption[index]);
					});
					return response;
				});
			},
			/**
			 * Returns carrier name for input carrier code
			 * @param  {Object} data         Flight data
			 * @param  {string} carrier_code carrier iata code
			 * @return {string}              Full carrier name
			 */
			getCarrierName : function(data,carrier_code){
				var carriers = data.trips.data.carrier;
				if(Array.isArray(carriers)){
					var carrier = $filter('filter')(carriers,{ code : carrier_code});
					if(Array.isArray(carrier) && carrier.length > 0){
						return carrier[0];
					}
				}
			},
			/**
			 * Returns airport name by iata code
			 * @param  {Object} data         FLight data
			 * @param  {string} airport_code airport iata code
			 * @return {string}              Full airport name
			 */
			getAirportName : function(data,airport_code){
				var airports = data.trips.data.airport;
				if(Array.isArray(airports)){
					var airport = $filter('filter')(airports,{ code : airport_code});
					if(Array.isArray(airport) && airport.length > 0){
						return airport[0];
					}
				}
			}			
		};
	}]);
});