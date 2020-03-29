"use strict";

let MapApp = angular.module('MapApp', ['dx', 'ngRoute'])
.config(function ($routeProvider) {

    $routeProvider.when('/main', {
    	templateUrl: '/templates/main.html',
    	controller: 'MainContrioller'
    })

    $routeProvider.when('/map', {
        templateUrl: '/templates/map.html',
        controller: 'MapController'
    })

    $routeProvider.otherwise({redirectTo: '/main'});
});