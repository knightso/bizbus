'use strict';

/**
 * @ngdoc function
 * @name mngApp.controller:RoutesCtrl
 * @description
 * # RoutesCtrl
 * Controller of the mngApp
 */
angular.module('mngApp')
  .controller('RoutesCtrl', function ($scope, $routeParams, $location, Agencies, Routes) {
    $scope.criteria = {};
    $scope.charLimit = 15;

    $scope.agency = Agencies.get({
      id : $routeParams.agencyId
    });

    $scope.routes = Routes.query({
      agencyId : $routeParams.agencyId
    });

    $scope.detail = function(agencyId, routeId) {
      $location.path('putRoute/' + agencyId + '/' + routeId);
    };
  });
