require.config({
	baseUrl : '../',
	paths   : {
		jQuery  :  'jquery/dist/jquery',
		angular :  'angular/angular',
		underscore: 'underscore/underscore',
		'angular-ui-router' : '../ui-router/release/angular-ui-router',
		restangular : '../restangular/src/restangular',
		'angular-bootstrap' : '../angular-bootstrap/ui-bootstrap-tpls',
		'angular-messages' : 'angular-messages/angular-messages',
		moment : '../moment/moment',
		text 	:  'requirejs-plugins/lib/text',
		json    :  'requirejs-plugins/src/json',
		core    :  'config/core',
		libs	:  'config/libs',
		app		:  'config/app'
	},
	shim    : {
		jQuery : { exports : 'jQuery' },
		angular: { exports : 'angular' , 'deps' : ['jQuery']},
		moment : { exports : 'moment',deps : ['angular']},
		libs : { deps : ['angular']},
		core : { deps : ['angular','libs']},
		underscore : { exports : 'underscore' },
		'angular-ui-router' : { deps : ['angular' , 'underscore']},
		'angular-messages' : { deps : ['angular']},
		restangular : { deps : ['angular']},
		app : { deps : ['angular','core','libs']},

	},
	waitSeconds : 0
});
require(['jQuery','angular','app'],function($,angular){
	$(function(){
		angular.bootstrap(document,['app']);
		$('.loader').hide();
	});
});