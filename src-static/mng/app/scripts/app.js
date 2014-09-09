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
    //'ngRoute',
    'ngSanitize',
    'ui.bootstrap',
    'ui.sortable',
    'ui.select',
    'ui.router',
    'ncy-angular-breadcrumb'
  ])
  .config(function ($stateProvider, $urlRouterProvider/*$routeProvider , $locationProvider*/) {
    //$locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/login');

    $stateProvider
      .state('agencies', {
        url: '/agencies',
        templateUrl: 'views/agencies.html',
        controller: 'AgenciesCtrl',
        data: {
          ncyBreadcrumbLabel: 'Agencies'
        }
      })
      .state('agencies.post', {
        url: '/@post', 
        views: {
          '@': { 
            templateUrl: 'views/putagency.html',
            controller: 'PutagencyCtrl',
            resolve: {method: function(){return 'POST';}}
          }
        },
        data: {
          ncyBreadcrumbLabel: 'Add'
        }
      })
      .state('agencies.detail', {
        url: '/:agencyId',
        views: {
          '@': { 
            templateUrl: 'views/putagency.html',
            controller: 'PutagencyCtrl',
            resolve: {method: function(){return 'PUT';}}
          }
        },
        data: {
          ncyBreadcrumbLabel: '{{agency.name}}'
        }
      })
      .state('agencies.detail.routes', {
        url: '/routes', 
        views: {
          '@': {
            templateUrl: 'views/routes.html',
            controller: 'RoutesCtrl'
          }
        },
        data: {
          ncyBreadcrumbLabel: 'Routes'
        }
      })
      .state('agencies.detail.routes.post', {
        url: '@post', 
        views: {
          '@': {
            templateUrl: 'views/putroute.html',
            controller: 'PutrouteCtrl',
            resolve: {method: function(){return 'POST';}}
          }
        },
        data: {
          ncyBreadcrumbLabel: 'Add'
        }
      })
      .state('agencies.detail.routes.detail', {
        url: '/:routeId', 
        views: {
          '@': {
            templateUrl: 'views/putroute.html',
            controller: 'PutrouteCtrl',
            resolve: {method: function(){return 'PUT';}}
          }
        },
        data: {
          ncyBreadcrumbLabel: '{{route.name}}'
        }
      })
      .state('tripgroups/:agencyId/:routeId', {
        url: '/tripgroups/:agencyId/:routeId', 
        templateUrl: 'views/tripgroups.html',
        controller: 'TripgroupsCtrl'
      })
      .state('tripgroups/:agencyId/:routeId/:tripgroupId/stops', {
        url: '/tripgroups/:agencyId/:routeId/:tripgroupId/stops', 
        templateUrl: 'views/tripgroupstops.html',
        controller: 'TripgroupstopsCtrl'
      })
      .state('postTripgroup/:agencyId/:routeId', {
        url: '/postTripgroup/:agencyId/:routeId', 
        templateUrl: 'views/puttripgroup.html',
        controller: 'PuttripgroupCtrl',
        resolve: {method: function(){return 'POST';}}
      })
      .state('putTripgroup/:agencyId/:routeId/:tripgroupId', {
        url: '/putTripgroup/:agencyId/:routeId/:tripgroupId', 
        templateUrl: 'views/puttripgroup.html',
        controller: 'PuttripgroupCtrl',
        resolve: {method: function(){return 'PUT';}}
      })
      .state('stops', {
        url: '/stops', 
        templateUrl: 'views/stops.html',
        controller: 'StopsCtrl'
      })
      .state('postStop', {
        url: '/postStop', 
        templateUrl: 'views/putstop.html',
        controller: 'PutstopCtrl',
        resolve: {method: function(){return 'POST';}}
      })
      .state('postStop/:id', {
        url: '/postStop/:id', 
        templateUrl: 'views/putstop.html',
        controller: 'PutstopCtrl',
        resolve: {method: function(){return 'POST';}}
      })
      .state('putStop/:id', {
        url: '/putStop/:id', 
        templateUrl: 'views/putstop.html',
        controller: 'PutstopCtrl',
        resolve: {method: function(){return 'PUT';}}
      })
      .state('terminals', {
        url: '/terminals', 
        templateUrl: 'views/terminals.html',
        controller: 'TerminalsCtrl'
      })
      .state('postTerminal', {
        url: '/postTerminal', 
        templateUrl: 'views/putterminal.html',
        controller: 'PutterminalCtrl',
        resolve: {method: function(){return 'POST';}}
      })
      .state('putTerminal/:id', {
        url: '/putTerminal/:id', 
        templateUrl: 'views/putterminal.html',
        controller: 'PutterminalCtrl',
        resolve: {method: function(){return 'PUT';}}
      })
      .state('services', {
        url: '/services', 
        templateUrl: 'views/services.html',
        controller: 'ServicesCtrl'
      })
      .state('postService', {
        url: '/postService', 
        templateUrl: 'views/putservice.html',
        controller: 'PutserviceCtrl',
        resolve: {method: function(){return 'POST';}}
      })
      .state('putService/:id', {
        url: '/putService/:id', 
        templateUrl: 'views/putservice.html',
        controller: 'PutserviceCtrl',
        resolve: {method: function(){return 'PUT';}}
      })
      .state('trips', {
        url: '/trips', 
        templateUrl: 'views/trips.html',
        controller: 'TripsCtrl'
      })
      .state('postTrip', {
        url: '/postTrip', 
        templateUrl: 'views/puttrip.html',
        controller: 'PuttripCtrl',
        resolve: {method: function(){return 'POST';}}
      })
      .state('putTrip/:id', {
        url: '/putTrip/:id', 
        templateUrl: 'views/puttrip.html',
        controller: 'PuttripCtrl',
        resolve: {method: function(){return 'PUT';}}
      })
      .state('login', {
        url: '/login', 
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      });
      /*
      .otherwise({
        redirectTo: '/'
      });
      */
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
