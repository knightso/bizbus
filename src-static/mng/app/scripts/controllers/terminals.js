'use strict';

/**
 * @ngdoc function
 * @name mngApp.controller:TerminalsCtrl
 * @description
 * # TerminalsCtrl
 * Controller of the mngApp
 */
angular.module('mngApp')
  .controller('TerminalsCtrl', function ($scope, Terminals) {
    $scope.criteria = {};
    $scope.terminals = Terminals.query();
  });
