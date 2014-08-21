'use strict';

/**
 * @ngdoc function
 * @name mngApp.controller:PutrouteCtrl
 * @description
 * # PutrouteCtrl
 * Controller of the mngApp
 */
angular.module('mngApp')
  .controller('PutrouteCtrl', function ($scope, Agencies, Routes, $routeParams, $timeout, method) {
    
    $scope.method = method;
    $scope.route = {};

    $scope.agency = Agencies.get({
      id : $routeParams.agencyId
    });

    $scope.ifRegister = true;  
    if (method === 'PUT') {
      $scope.route = Routes.get({
        agencyId : $routeParams.agencyId,
        id : $routeParams.routeId
      });
      $scope.ifRegister = false;  
    } else {
      $scope.route.agencyId = $routeParams.agencyId;
    }

    $scope.submit = function() {

      $scope.alerts = [];
      if (!$scope.routeForm.$valid) {
        $scope.alerts.push({type: 'danger', msg: '入力に不備がある為保存に失敗しました。\n各項目を見直して下さい。'});
        return;
      }

      var start = +new Date();
      var tout = 100;
      var doSave = function(actualF) {
        actualF($scope.route,
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
        doSave(Routes.register);
      } else {
        doSave(Routes.update);
      }
    };

    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };
  });
