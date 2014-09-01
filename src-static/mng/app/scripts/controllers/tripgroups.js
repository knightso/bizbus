'use strict';

/**
 * @ngdoc function
 * @name mngApp.controller:TripgroupsCtrl
 * @description
 * # TripgroupsCtrl
 * Controller of the mngApp
 */
angular.module('mngApp')
  .controller('TripgroupsCtrl', function ($scope, Tripgroups, Enums, $routeParams) {
    $scope.criteria = {};
    $scope.charLimit = 15;
    $scope.agencyId = $routeParams.agencyId;
    $scope.routeId = $routeParams.routeId;
    $scope.directionTypes = Enums.directionTypes;

    $scope.tripgroups = Tripgroups.query({
      agencyId : $routeParams.agencyId,
      routeId : $routeParams.routeId
    });
  });
