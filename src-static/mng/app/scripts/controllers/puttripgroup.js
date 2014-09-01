'use strict';

/**
 * @ngdoc function
 * @name mngApp.controller:PuttripgroupCtrl
 * @description
 * # PuttripgroupCtrl
 * Controller of the mngApp
 */
angular.module('mngApp')
  .controller('PuttripgroupCtrl', function ($scope, Tripgroups, Enums, $routeParams, $timeout, method) {
    
    $scope.method = method;
    $scope.tg = {};
    $scope.directionTypes = Enums.directionTypes;

    $scope.ifRegister = true;  
    if (method === 'PUT') {
      $scope.tg = Tripgroups.get({
        agencyId : $routeParams.agencyId,
        routeId : $routeParams.routeId,
        id : $routeParams.tripgroupId
      });
      $scope.tg.$promise.then(function() {
        $scope.tg.agencyId = $routeParams.agencyId;
        $scope.tg.routeId = $routeParams.routeId;
      });
      $scope.ifRegister = false;
    } else {
      $scope.tg.agencyId = $routeParams.agencyId;
      $scope.tg.routeId = $routeParams.routeId;
    }

    $scope.submit = function() {

      $scope.alerts = [];
      if (!$scope.tgForm.$valid) {
        $scope.alerts.push({type: 'danger', msg: '入力に不備がある為保存に失敗しました。\n各項目を見直して下さい。'});
        return;
      }

      var start = +new Date();
      var tout = 100;
      var doSave = function(actualF) {
        actualF($scope.tg,
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
        doSave(Tripgroups.register);
      } else {
        doSave(Tripgroups.update);
      }
    };

    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };
  });
