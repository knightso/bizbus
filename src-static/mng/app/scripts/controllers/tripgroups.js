'use strict';

/**
 * @ngdoc function
 * @name mngApp.controller:TripgroupsCtrl
 * @description
 * # TripgroupsCtrl
 * Controller of the mngApp
 */
angular.module('mngApp')
  .controller('TripgroupsCtrl', function ($scope, $stateParams, $location, Tripgroups, Enums) {
    $scope.criteria = {};
    $scope.charLimit = 15;
    $scope.agencyId = $stateParams.agencyId;
    $scope.routeId = $stateParams.routeId;
    $scope.directionTypes = Enums.directionTypes;

    $scope.tripgroups = Tripgroups.query({
      agencyId : $stateParams.agencyId,
      routeId : $stateParams.routeId
    });

    $scope.detail = function(agencyId, routeId, tgId) {
      $location.path('putTripgroup/' + agencyId + '/' + routeId + '/' + tgId);
    };
  });
