'use strict';
var myApp = angular.module('myApp',['ui.router','ui.bootstrap']);

myApp.config(function($stateProvider,$urlRouterProvider){
	var home = {
			name : 'home',
			url  : '/',
			templateUrl : '/src/views/home.html'
	};

	$stateProvider.state(home);
   $urlRouterProvider.otherwise('/');
});

