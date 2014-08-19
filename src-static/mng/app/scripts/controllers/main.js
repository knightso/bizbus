'use strict';

/**
 * @ngdoc function
 * @name mngApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mngApp
 */
angular.module('mngApp')
  .controller('MainCtrl', function ($scope, Agencies) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.agency = Agencies.get({id: '1'});
  });
