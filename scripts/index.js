"use strict";
let MapApp = angular
    .module('MapApp', ['dx', 'ngRoute', 'ngCookies'])
    .config(config)
    .run(run);

config.$inject = ['$routeProvider', '$locationProvider'];
function config($routeProvider, $locationProvider) {
    $routeProvider
        .when('/map', {
            templateUrl: '/templates/map.html',
            controller: 'MapController'
        })

        .when('/sign-in', {
            templateUrl: '/templates/sign-in.html',
            controller: 'SignInController'
        })

        .otherwise({redirectTo: '/map'});
}

run.$inject = ['$rootScope', '$location', '$cookies', '$http'];
function run($rootScope, $location, $cookies, $http) {
    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        console.log(localStorage.getItem('user'));
        if (!localStorage.getItem('user'))
            $location.path('/sign-in');
        else
            $location.path('/map');
    });
}