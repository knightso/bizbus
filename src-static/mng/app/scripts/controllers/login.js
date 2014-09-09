'use strict';

/**
 * @ngdoc function
 * @name mngApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the mngApp
 */
angular.module('mngApp')
  .controller('LoginCtrl', function ($scope, $location, login) {
    $scope.login = function () {
      login.login();
      $location.path('/agencies');
    };
  });
