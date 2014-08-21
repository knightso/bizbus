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

    $scope.agencies.$promise.then(function(agencies) {
      for (var i = 0; i < agencies.length; i++) {
        $scope.agencies[i].routenums = agencies[i].routes === undefined ? 0 : agencies[i].routes.length;
      }
    });

  });
