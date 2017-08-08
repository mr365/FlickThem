'use strict';
var myApp = angular.module('myApp',['ui.router','ui.bootstrap']);

myApp.config(function($stateProvider,$urlRouterProvider){
	var home = {
			name : 'home',
			url  : '/',
			templateUrl : 'https://mr365.github.io/FlickThem/src/views/home.html'
	};

	$stateProvider.state(home);
   $urlRouterProvider.otherwise('/');
});

