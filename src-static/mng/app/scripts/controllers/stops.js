'use strict';

/**
 * @ngdoc function
 * @name mngApp.controller:StopsCtrl
 * @description
 * # StopsCtrl
 * Controller of the mngApp
 */
angular.module('mngApp')
  .controller('StopsCtrl', function ($scope, $location, Stations) {
    $scope.criteria = {};
    $scope.stations = [];

    $scope.search = function () {
      $scope.stations = Stations.query();
    };

    $scope.detail = function(stopId) {
      $location.path('putStop/' + stopId);
    };

    $scope.post = function(stopId) {
      $location.path('postStop/' + stopId);
    };
  });
