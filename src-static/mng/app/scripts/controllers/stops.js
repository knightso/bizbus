'use strict';

/**
 * @ngdoc function
 * @name mngApp.controller:StopsCtrl
 * @description
 * # StopsCtrl
 * Controller of the mngApp
 */
angular.module('mngApp')
  .controller('StopsCtrl', function ($scope, $state, Stations) {
    $scope.criteria = {};
    $scope.stations = [];

    $scope.search = function () {
      $scope.stations = Stations.query();
    };

    $scope.detail = function(stopId) {
      $state.go('stops.detail', {stopId: stopId});
    };

    $scope.post = function(stopId) {
      $state.go('stops.post2', {stopId: stopId});
    };
  });
