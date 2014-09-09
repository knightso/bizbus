'use strict';

/**
 * @ngdoc function
 * @name mngApp.controller:RoutesCtrl
 * @description
 * # RoutesCtrl
 * Controller of the mngApp
 */
angular.module('mngApp')
  .controller('RoutesCtrl', function ($scope, $stateParams, $location, $state, Agencies, Routes) {
    $scope.criteria = {};
    $scope.charLimit = 15;

    $scope.agency = Agencies.get({
      id : $stateParams.agencyId
    });

    $scope.routes = Routes.query({
      agencyId : $stateParams.agencyId
    });

    $scope.detail = function(agencyId, routeId) {
      $state.go('agencies.detail.routes.detail', {agencyId: agencyId, routeId: routeId});
    };
  });
