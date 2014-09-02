'use strict';

/**
 * @ngdoc function
 * @name mngApp.controller:TripgroupsCtrl
 * @description
 * # TripgroupsCtrl
 * Controller of the mngApp
 */
angular.module('mngApp')
  .controller('TripgroupsCtrl', function ($scope, $routeParams, $location, Tripgroups, Enums) {
    $scope.criteria = {};
    $scope.charLimit = 15;
    $scope.agencyId = $routeParams.agencyId;
    $scope.routeId = $routeParams.routeId;
    $scope.directionTypes = Enums.directionTypes;

    $scope.tripgroups = Tripgroups.query({
      agencyId : $routeParams.agencyId,
      routeId : $routeParams.routeId
    });

    $scope.detail = function(agencyId, routeId, tgId) {
      $location.path('putTripgroup/' + agencyId + '/' + routeId + '/' + tgId);
    };
  });
