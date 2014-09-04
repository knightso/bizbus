'use strict';

/**
 * @ngdoc function
 * @name mngApp.controller:PutserviceCtrl
 * @description
 * # PutserviceCtrl
 * Controller of the mngApp
 */
angular.module('mngApp')
  .controller('PutserviceCtrl', function ($scope, $routeParams, $timeout, $location, method, Agencies, Services) {
    
    $scope.method = method;
    $scope.agencies = Agencies.query();
    $scope.service = {};
    $scope.calendars = {};
    $scope.calendarDates = {};
    $scope.format = 'yyyy/MM/dd';
    
    //TODO need remove it..
    $scope.testdates = [
          {'startDate':'2014/09/01','endDate':'2014/10/01'},
          {'startDate':'2014/09/02','endDate':'2014/10/02'},
          {'startDate':'2014/09/03','endDate':'2014/10/03'}];
    $scope.open = function($event, inputId) {
      $event.preventDefault();
      $event.stopPropagation();console.log(inputId);

      //TODO need refactor there...
      if (inputId === 's0') {
        $scope.s0 = true;
      } else if (inputId === 'e0') {
        $scope.e0 = true;
      }  

      if (inputId === 's1') {
        $scope.s1 = true;
      } else if (inputId === 'e1') {
        $scope.e1 = true;
      }

     if (inputId === 's2') {
        $scope.s2 = true;
      } else if (inputId === 'e2') {
        $scope.e2 = true;
      }

     if (inputId === 's3') {
        $scope.s3 = true;
      } else if (inputId === 'e3') {
        $scope.e3 = true;
      }

     if (inputId === 's4') {
        $scope.s4 = true;
      } else if (inputId === 'e4') {
        $scope.e4 = true;
      }

     if (inputId === 's5') {
        $scope.s5 = true;
      } else if (inputId === 'e5') {
        $scope.e5 = true;
      }
    };
    $scope.open2 = function($event, openName) {
      $event.preventDefault();
      $event.stopPropagation();

      if (openName === 'openDde1') {
        $scope.openDde1 = true;
      } else if (openName === 'openDds1') {
        $scope.openDds1 = true;
      }
    };

    $scope.regMode = true;
    $scope.detailMode = false;
    if (method === 'PUT') {
      $scope.service = Services.get({
        id : $routeParams.id
      });
      $scope.regMode = false;
      $scope.detailMode = true;
    }

    $scope.submit = function() {

      $scope.alerts = [];
      $scope.error = {};
      if (!$scope.serviceForm.$valid) {
        $scope.alerts.push({type: 'danger', msg: '入力に不備がある為保存に失敗しました。\n各項目を見直して下さい。'});
        return;
      }

      var start = +new Date();
      var tout = 100;
      var doSave = function(actualF) {
        actualF($scope.service,
          function() {
            var tat = +new Date() - start;
              $timeout(function() {
                $scope.alerts.push({type: 'success', msg: '保存に成功しました。'});
                if ($scope.regMode === false) {
                  $scope.detailMode = true;
                } else {
                  $location.path('services');
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
console.log($scope.service);
      if ($scope.regMode) {
        doSave(Services.register);
      } else {
        doSave(Services.update);
      }
      
    };

    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };
  });

