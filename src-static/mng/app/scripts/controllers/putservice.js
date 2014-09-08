'use strict';

/**
 * @ngdoc function
 * @name mngApp.controller:PutserviceCtrl
 * @description
 * # PutserviceCtrl
 * Controller of the mngApp
 */
angular.module('mngApp')
  .controller('PutserviceCtrl', function ($scope, $routeParams, $timeout, $location, method, Agencies, Services, Calendars, Calendardates, Enums) {
    
    $scope.method = method;
    $scope.agencies = Agencies.query();
    $scope.exceptionTypes = Enums.exceptionTypes;
    $scope.service = {};
    $scope.format = 'yyyyMMdd';

    $scope.$watch('calendars', function() {
      if (!$scope.calendars) {
        return;
      }
      angular.forEach($scope.calendars, function(cal) {
        cal.sunday = Number(cal.sunday);
        cal.monday = Number(cal.monday);
        cal.tuesday = Number(cal.tuesday);
        cal.wednesday = Number(cal.wednesday);
        cal.thursday = Number(cal.thursday);
        cal.friday = Number(cal.friday);
        cal.saturday = Number(cal.saturday);
      });
    }, true); // TODO: optimize this

    $scope.regMode = true;
    $scope.detailMode = false;
    if (method === 'PUT') {
      $scope.service = Services.get({
        id : $routeParams.id
      });
      $scope.regMode = false;
      $scope.detailMode = true;

      $scope.calendars = Calendars.queryByService({
        serviceId : $routeParams.id
      });
      $scope.calendars.$promise.then(function(calendars) {
        if (calendars.length === 0) {
          $scope.calendars = [{}];
        } else {
          angular.forEach(calendars, function(calendar) {
            if (calendar.startDate !== undefined || calendar.startDate !== '') {
              calendar.startDateType = new Date(calendar.startDate.substring(0,4), calendar.startDate.substring(4,6)-1, calendar.startDate.substring(6,8));
            }

            if (calendar.endDate !== undefined || calendar.endDate !== '') {
              calendar.endDateType = new Date(calendar.endDate.substring(0,4), calendar.endDate.substring(4,6)-1, calendar.endDate.substring(6,8));
            }
          });
        }
      });

      $scope.calendarDates = Calendardates.queryByService({
        serviceId : $routeParams.id
      });
      $scope.calendarDates.$promise.then(function(calendarDates) {
        if (calendarDates.length === 0) {
          $scope.calendarDates = [{}];
        } else {
          angular.forEach(calendarDates, function(calendarDate) {
            if (calendarDate.date !== undefined || calendarDate.date !== '') {
              calendarDate.dateType = new Date(calendarDate.date.substring(0,4), calendarDate.date.substring(4,6)-1, calendarDate.date.substring(6,8));
            }
          });
        }
      });
    } else {
      $scope.calendars = [{}];
      $scope.calendarDates = [{}];
    }
    
    $scope.open = function($event, data, propName) {
      $event.preventDefault();
      $event.stopPropagation();
      data[propName] = true;
    };

    $scope.addCalendar = function() {
      $scope.calendars.push({
      });
    };
    
    $scope.removeCalendar = function(calToRemove) {
      var index = $scope.calendars.indexOf(calToRemove);
      $scope.calendars.splice(index, 1);
    };

    $scope.addCalendarDate = function() {
      $scope.calendarDates.push({
      });
    };
    
    $scope.removeCalendarDate = function(cdToRemove) {
      var index = $scope.calendarDates.indexOf(cdToRemove);
      $scope.calendarDates.splice(index, 1);
    };

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

