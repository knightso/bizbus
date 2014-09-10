'use strict';

/**
 * @ngdoc function
 * @name mngApp.controller:TripsCtrl
 * @description
 * # TripsCtrl
 * Controller of the mngApp
 */
angular.module('mngApp')
  .controller('TripsCtrl', function ($scope, $stateParams, $state, $location, Agencies, Routes, Tripgroups, Trips, Enums) {
    $scope.criteria = {};
    $scope.directionTypes = Enums.directionTypes;

    $scope.agency = Agencies.get({
      id : $stateParams.agencyId
    });

    $scope.route = Routes.get({
      agencyId : $stateParams.agencyId,
      id : $stateParams.routeId
    });

    $scope.tg = Tripgroups.get({
        agencyId : $stateParams.agencyId,
        routeId : $stateParams.routeId,
        id : $stateParams.tripgroupId
      });

    $scope.trips = Trips.query({
        agencyId : $stateParams.agencyId,
        routeId : $stateParams.routeId,
        tripgroupId : $stateParams.tripgroupId
      });

    $scope.detail = function(agencyId, routeId, tgId, tripId) {
      $state.go('agencies.detail.routes.detail.tripgroups.detail.trips.detail', {agencyId: agencyId, routeId: routeId, tripgroupId: tgId, tripId: tripId});
    };
  });
