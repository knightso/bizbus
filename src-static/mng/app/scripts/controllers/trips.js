'use strict';

/**
 * @ngdoc function
 * @name mngApp.controller:TripsCtrl
 * @description
 * # TripsCtrl
 * Controller of the mngApp
 */
angular.module('mngApp')
  .controller('TripsCtrl', function ($scope, $location, Trips, Enums) {
    $scope.criteria = {};
    $scope.trips = Trips.query();
    $scope.directionTypes = Enums.directionTypes;

    $scope.detail = function(tripId) {
      $location.path('putTrip/' + tripId);
    };
  });
