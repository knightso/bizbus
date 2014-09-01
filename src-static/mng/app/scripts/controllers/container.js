'use strict';

/**
 * @ngdoc function
 * @name mngApp.controller:ContainerCtrl
 * @description
 * # ContainerCtrl
 * Controller of the mngApp
 */
angular.module('mngApp')
  .controller('ContainerCtrl', function ($scope, login) {
    $scope.loginUser = login.getLoginUser();
  });
