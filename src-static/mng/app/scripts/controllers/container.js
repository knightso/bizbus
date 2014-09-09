'use strict';

/**
 * @ngdoc function
 * @name mngApp.controller:ContainerCtrl
 * @description
 * # ContainerCtrl
 * Controller of the mngApp
 */
angular.module('mngApp')
  .controller('ContainerCtrl', function ($scope, $location/*, login*/) {
    $scope.dummyLoginUser = {name:'山田 太郎'};
    $scope.getLoginUser = function() {
      //return login.getLoginUser();
      // TODO
      return $location.path() === '/login' ? null : $scope.dummyLoginUser;
    };
  });
