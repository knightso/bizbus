'use strict';

/**
 * @ngdoc function
 * @name mngApp.controller:TerminalsCtrl
 * @description
 * # TerminalsCtrl
 * Controller of the mngApp
 */
angular.module('mngApp')
  .controller('TerminalsCtrl', function ($scope, $location, Terminals) {
    $scope.criteria = {};
    $scope.terminals = Terminals.query();

    $scope.detail = function(terminalId) {
      $location.path('putTerminal/' + terminalId);
    };
  });
