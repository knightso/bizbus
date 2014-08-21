'use strict';

/**
 * @ngdoc function
 * @name mngApp.controller:PutagencyCtrl
 * @description
 * # PutagencyCtrl
 * Controller of the mngApp
 */
angular.module('mngApp')
  .controller('PutagencyCtrl', function ($scope, Agencies, $routeParams, $timeout, method) {
    
    $scope.method = method;
    $scope.agency = {};
    
    $scope.ifRegister = true;
    if (method === 'PUT') {
      $scope.agency = Agencies.get({
        id : $routeParams.id
      });
    $scope.ifRegister = false;
    }

    var validate = function(telnum) {
      if (telnum === undefined) {
        telnum = '';
      }
      if (telnum.match(/^[0-9-]*$/) !== null) {
        return true;
      } else {
        $scope.error.telerror = true;
      }
      return false;
    };

    $scope.submit = function() {

      $scope.alerts = [];
      $scope.error = {};
      if (!$scope.agencyForm.$valid) {
        $scope.alerts.push({type: 'danger', msg: '入力に不備がある為保存に失敗しました。\n各項目を見直して下さい。'});
        return;
      }

      var start = +new Date();
      var tout = 100;
      var doSave = function(actualF) {
        actualF($scope.agency,
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

      var telnum = $scope.agency.phone;
      if (validate(telnum)) {
        if ($scope.ifRegister) {
          doSave(Agencies.register);
        } else {
          doSave(Agencies.update);
        }
      }
    };

    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };
  });
