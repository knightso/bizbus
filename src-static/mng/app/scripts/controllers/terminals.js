'use strict';

/**
 * @ngdoc function
 * @name mngApp.controller:TerminalsCtrl
 * @description
 * # TerminalsCtrl
 * Controller of the mngApp
 */
angular.module('mngApp')
  .controller('TerminalsCtrl', function ($scope, $state, $location, Terminals) {
    $scope.criteria = {};
    $scope.terminals = Terminals.query();

    $scope.detail = function(terminalId) {
      $state.go('terminals.detail', {terminalId: terminalId});
    };
  });
