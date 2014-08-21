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
