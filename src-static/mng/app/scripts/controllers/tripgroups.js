'use strict';

/**
 * @ngdoc function
 * @name mngApp.controller:TripgroupsCtrl
 * @description
 * # TripgroupsCtrl
 * Controller of the mngApp
 */
angular.module('mngApp')
  .controller('TripgroupsCtrl', function ($scope, $stateParams, $location, $state, Agencies, Routes, Tripgroups, Enums) {
    $scope.criteria = {};
    $scope.charLimit = 15;
    $scope.directionTypes = Enums.directionTypes;

    $scope.agency = Agencies.get({
      id : $stateParams.agencyId
    });

    $scope.route = Routes.get({
      agencyId : $stateParams.agencyId,
      id : $stateParams.routeId
    });

    $scope.tripgroups = Tripgroups.query({
      agencyId : $stateParams.agencyId,
      routeId : $stateParams.routeId
    });

    $scope.detail = function(agencyId, routeId, tgId) {
      $state.go('agencies.detail.routes.detail.tripgroups.detail', {agencyId: agencyId, routeId: routeId, tripgroupId: tgId});
    };
  });
