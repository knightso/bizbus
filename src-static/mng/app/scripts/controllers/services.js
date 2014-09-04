'use strict';

/**
 * @ngdoc function
 * @name mngApp.controller:ServicesCtrl
 * @description
 * # ServicesCtrl
 * Controller of the mngApp
 */
angular.module('mngApp')
  .controller('ServicesCtrl', function ($scope, $location, Services) {
    $scope.criteria = {};
    $scope.services = Services.query();

    $scope.detail = function(serviceId) {
      $location.path('putService/' + serviceId);
    };
  });
