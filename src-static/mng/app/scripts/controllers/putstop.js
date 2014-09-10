'use strict';

/**
 * @ngdoc function
 * @name mngApp.controller:PutstopCtrl
 * @description
 * # PutstopCtrl
 * Controller of the mngApp
 */
angular.module('mngApp')
  .controller('PutstopCtrl', function ($scope, $stateParams, $timeout, $location, method, Stations) {
    
    $scope.method = method;
    $scope.stop = {};
    
    $scope.regMode = true;
    $scope.ifTopStop = true;
    $scope.detailMode = false;
    if (method === 'PUT') {
      $scope.stop = Stations.get({
        id : $stateParams.stopId
      });
      $scope.stop.$promise.then(function(stop) {
        if (stop.locationType === undefined) {
          $scope.stop.locationType = 0;
        }
        if (stop.parentStation !== undefined) {
          $scope.ifTopStop = false;
          $scope.pStop = Stations.get({
            id : stop.parentStation
          });
        }
      });
      $scope.regMode = false;
      $scope.detailMode = true;
    } else {
      $scope.stop.parentStation = $stateParams.stopId;
      if ($scope.stop.parentStation !== undefined) {
        $scope.ifTopStop = false;
        $scope.pStop = Stations.get({
          id : $stateParams.stopId
        });
      }
      $scope.stop.locationType = 0;
    }

    $scope.submit = function() {

      $scope.alerts = [];
      $scope.error = {};
      if (!$scope.stopForm.$valid) {
        $scope.alerts.push({type: 'danger', msg: '入力に不備がある為保存に失敗しました。\n各項目を見直して下さい。'});
        return;
      }

      var start = +new Date();
      var tout = 100;
      var doSave = function(actualF) {
        actualF($scope.stop,
          function() {
            var tat = +new Date() - start;
              $timeout(function() {
                $scope.alerts.push({type: 'success', msg: '保存に成功しました。'});
                if ($scope.regMode === false) {
                  $scope.detailMode = true;
                } else {
                  $location.path('stops');
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
        doSave(Stations.register);
      } else {
        doSave(Stations.update);
      }
    };

    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };
  });

