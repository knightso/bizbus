'use strict';

/**
 * @ngdoc function
 * @name mngApp.controller:PuttripCtrl
 * @description
 * # PuttripCtrl
 * Controller of the mngApp
 */
angular.module('mngApp')
  .controller('PuttripCtrl', function ($scope, $routeParams, $timeout, $location, method, Trips, Services, Enums) {
    
    $scope.method = method;
    $scope.services = Services.query();
    $scope.trip = {};
    $scope.directionTypes = Enums.directionTypes;

    $scope.regMode = true;
    $scope.detailMode = false;
    if (method === 'PUT') {
      $scope.trip = Trips.get({
        id : $routeParams.id
      });
      $scope.regMode = false;
      $scope.detailMode = true;
    }

    $scope.submit = function() {

      $scope.alerts = [];
      $scope.error = {};
      if (!$scope.tripForm.$valid) {
        $scope.alerts.push({type: 'danger', msg: '入力に不備がある為保存に失敗しました。\n各項目を見直して下さい。'});
        return;
      }

      var start = +new Date();
      var tout = 100;
      var doSave = function(actualF) {
        actualF($scope.trip,
          function() {
            var tat = +new Date() - start;
              $timeout(function() {
                $scope.alerts.push({type: 'success', msg: '保存に成功しました。'});
                if ($scope.regMode === false) {
                  $scope.detailMode = true;
                } else {
                  $location.path('trips');
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
        doSave(Trips.register);
      } else {
        doSave(Trips.update);
      }
      
    };

    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };
  });

