'use strict';

/**
 * @ngdoc function
 * @name mngApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the mngApp
 */
angular.module('mngApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
