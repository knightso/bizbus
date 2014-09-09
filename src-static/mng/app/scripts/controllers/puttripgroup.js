'use strict';

/**
 * @ngdoc function
 * @name mngApp.controller:PuttripgroupCtrl
 * @description
 * # PuttripgroupCtrl
 * Controller of the mngApp
 */
angular.module('mngApp')
  .controller('PuttripgroupCtrl', function ($scope, $stateParams, $timeout, $location, method, Tripgroups, Enums) {
    
    $scope.method = method;
    $scope.tg = {};
    $scope.directionTypes = Enums.directionTypes;

    $scope.regMode = true;
    $scope.detailMode = false;  
    if (method === 'PUT') {
      $scope.tg = Tripgroups.get({
        agencyId : $stateParams.agencyId,
        routeId : $stateParams.routeId,
        id : $stateParams.tripgroupId
      });
      $scope.tg.$promise.then(function() {
        $scope.tg.agencyId = $stateParams.agencyId;
        $scope.tg.routeId = $stateParams.routeId;
      });
      $scope.regMode = false;
      $scope.detailMode = true;
    } else {
      $scope.tg.agencyId = $stateParams.agencyId;
      $scope.tg.routeId = $stateParams.routeId;
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
                if ($scope.regMode === false) {
                  $scope.detailMode = true;
                } else {
                  $location.path('tripgroups/' + $stateParams.agencyId + '/' + $stateParams.routeId);
                }
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

      if ($scope.regMode) {
        doSave(Tripgroups.register);
      } else {
        doSave(Tripgroups.update);
      }
    };

    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };
  });
