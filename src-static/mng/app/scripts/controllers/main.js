'use strict';

/**
 * @ngdoc function
 * @name mngApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mngApp
 */
angular.module('mngApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
