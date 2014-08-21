'use strict';

/**
 * @ngdoc function
 * @name mngApp.controller:RoutesCtrl
 * @description
 * # RoutesCtrl
 * Controller of the mngApp
 */
angular.module('mngApp')
  .controller('RoutesCtrl', function ($scope, Agencies, Routes, $routeParams) {
    $scope.criteria = {};
    $scope.charLimit = 15;

    $scope.agency = Agencies.get({
      id : $routeParams.agencyId
    });

    $scope.routes = Routes.query({
      agencyId : $routeParams.agencyId
    });
  });
