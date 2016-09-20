define(['angular','jQuery'], function (angular,$) {

    var module = angular.module('app.core.http.interceptor.services', []);

    module.factory('HttpInterceptorServices', ['$injector',function ($injector) {
        var $loader = $('.loader'),
            $http ;
        var skip_domains = ['https://airports.p.mashape.com/'];
        return {

            'request': function(config) {
                if(skip_domains.indexOf(config.url) == -1){
                     $loader.show();
                }
                return config;
            },

            'response': function(response) {
                $http = $http || $injector.get('$http');
                if ($http.pendingRequests.length < 1) {
                    $loader.hide();
                }
                return response;
            },

            'responseError': function(rejection) {
                $http = $http || $injector.get('$http');
                if ($http.pendingRequests.length < 1) {
                    $loader.hide();
                }
                return rejection;
            },            
        };
    }]);

    return module;

});

