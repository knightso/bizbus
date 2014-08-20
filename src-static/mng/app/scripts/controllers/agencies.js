'use strict';

/**
 * @ngdoc function
 * @name mngApp.controller:AgenciesCtrl
 * @description
 * # AgenciesCtrl
 * Controller of the mngApp
 */
angular.module('mngApp')
  .controller('AgenciesCtrl', function ($scope, Agencies) {
    $scope.criteria = {};
    $scope.agencies = Agencies.query();
  });
