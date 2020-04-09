"use strict";
let MapApp = angular
    .module('MapApp', ['dx', 'ngRoute', 'ngCookies'])
    .config(config)
    .run(run);


config.$inject = ['$routeProvider', '$locationProvider'];
function config($routeProvider, $locationProvider) {
    $routeProvider
        .when('/main', {
            templateUrl: '/templates/main.html',
            controller: 'MainContrioller'
        })

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
    
    // $rootScope.globals = $cookies.get('user') || {};
    // if ($rootScope.globals.currentUser) {
    //     $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
    // }

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        // let loggedIn = $rootScope.globals.currentUser;
        if (!$cookies.get('user'))
            $location.path('/sign-in');
        else
            $location.path('/map');
    });
}