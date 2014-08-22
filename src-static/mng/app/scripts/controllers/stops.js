'use strict';

/**
 * @ngdoc function
 * @name mngApp.controller:StopsCtrl
 * @description
 * # StopsCtrl
 * Controller of the mngApp
 */
angular.module('mngApp')
  .controller('StopsCtrl', function ($scope, Stations) {
    $scope.criteria = {};
    $scope.stations = Stations.query();
  });
