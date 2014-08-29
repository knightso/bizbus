'use strict';

/**
 * @ngdoc function
 * @name mngApp.controller:PutterminalCtrl
 * @description
 * # PutterminalCtrl
 * Controller of the mngApp
 */
angular.module('mngApp')
  .controller('PutterminalCtrl', function ($scope, Terminals, $routeParams, $timeout, method) {
    
    $scope.method = method;
    $scope.terminal = {};
    
    $scope.ifRegister = true;
    if (method === 'PUT') {
      $scope.terminal = Terminals.get({
        id : $routeParams.id
      });
    $scope.ifRegister = false;
    }

    $scope.submit = function() {

      $scope.alerts = [];
      $scope.error = {};
      if (!$scope.terminalForm.$valid) {
        $scope.alerts.push({type: 'danger', msg: '入力に不備がある為保存に失敗しました。\n各項目を見直して下さい。'});
        return;
      }

      var start = +new Date();
      var tout = 100;
      var doSave = function(actualF) {
        actualF($scope.terminal,
          function() {
            var tat = +new Date() - start;
              $timeout(function() {
                $scope.alerts.push({type: 'success', msg: '保存に成功しました。'});
              }, (tat >= tout ? 0 : tout - tat));
            },
            function() {
              var tat = +new Date() - start;
              $timeout(function() {
                $scope.alerts.push({type: 'danger', msg: '保存に失敗しました。'});
              }, (tat >= tout ? 0 : tout - tat));
            }
        ); 
      };

      if ($scope.ifRegister) {
        doSave(Terminals.register);
      } else {
        doSave(Terminals.update);
      }
      
    };

    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };
  });
