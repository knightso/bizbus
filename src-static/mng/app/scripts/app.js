'use strict';

/**
 * @ngdoc overview
 * @name mngApp
 * @description
 * # mngApp
 *
 * Main module of the application.
 */
angular
  .module('mngApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ui.bootstrap',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/agencies', {
        templateUrl: 'views/agencies.html',
        controller: 'AgenciesCtrl'
      })
      .when('/postAgency', {
        templateUrl: 'views/putagency.html',
        controller: 'PutagencyCtrl',
        resolve: {method: function(){return 'POST';}}
      })
      .when('/putAgency/:id', {
        templateUrl: 'views/putagency.html',
        controller: 'PutagencyCtrl',
        resolve: {method: function(){return 'PUT';}}
      })
      .when('/routes/:agencyId', {
        templateUrl: 'views/routes.html',
        controller: 'RoutesCtrl'
      })
      .when('/postRoute/:agencyId', {
        templateUrl: 'views/putroute.html',
        controller: 'PutrouteCtrl',
        resolve: {method: function(){return 'POST';}}
      })
      .when('/putRoute/:agencyId/:routeId', {
        templateUrl: 'views/putroute.html',
        controller: 'PutrouteCtrl',
        resolve: {method: function(){return 'PUT';}}
      })
      .when('/tripgroups/:routeId', {
        templateUrl: 'views/tripgroups.html',
        controller: 'TripgroupsCtrl'
      })
      .when('/postTripgroup/:routeId', {
        templateUrl: 'views/puttripgroup.html',
        controller: 'PuttripgroupCtrl',
        resolve: {method: function(){return 'POST';}}
      })
      .when('/putTripgroup/:routeId/:tripgroupId', {
        templateUrl: 'views/puttripgroup.html',
        controller: 'PuttripgroupCtrl',
        resolve: {method: function(){return 'PUT';}}
      })
      .when('/stops', {
        templateUrl: 'views/stops.html',
        controller: 'StopsCtrl'
      })
      .when('/terminals', {
        templateUrl: 'views/terminals.html',
        controller: 'TerminalsCtrl'
      })
      .when('/postTerminal', {
        templateUrl: 'views/putterminal.html',
        controller: 'PutterminalCtrl',
        resolve: {method: function(){return 'POST';}}
      })
      .when('/putTerminal/:id', {
        templateUrl: 'views/putterminal.html',
        controller: 'PutterminalCtrl',
        resolve: {method: function(){return 'PUT';}}
      })
      .otherwise({
        redirectTo: '/'
      });
  });

// for mock
(function() {
  if (location.hostname !== 'mockhost') {
    return;
  }

  var importMockJs = function(jsfile) {
    /*jslint evil: true */
    document.write('<script type="text/javascript" src="' + jsfile + '"></script>');
  };

  //importMockJs('bower_components/angular-mocks/angular-mocks.js');
  importMockJs('scripts/mock/angular-mocks.js');
  importMockJs('scripts/mock/mocktangle.js');
  importMockJs('scripts/mock/app-mock.js');
})();
