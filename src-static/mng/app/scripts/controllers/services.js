'use strict';

/**
 * @ngdoc function
 * @name mngApp.controller:ServicesCtrl
 * @description
 * # ServicesCtrl
 * Controller of the mngApp
 */
angular.module('mngApp')
  .controller('ServicesCtrl', function ($scope, $location, $state, $stateParams, Agencies, Services) {
    $scope.criteria = {};
    
    $scope.services = Services.query();
    
    $scope.agency = Agencies.get({
      id : $stateParams.agencyId
    });

    $scope.detail = function(serviceId) {
      $state.go('agencies.detail.services.detail', {agencyId: $stateParams.agencyId, serviceId: serviceId});
    };
  });
