'use strict';

/**
 * @ngdoc function
 * @name mngApp.controller:TripgroupstopsCtrl
 * @description
 * # TripgroupstopsCtrl
 * Controller of the mngApp
 */
angular.module('mngApp')
  .controller('TripgroupstopsCtrl', function ($scope, $routeParams, $timeout, Tripgroups, Stations) {
    $scope.charLimit = 15;
    $scope.agencyId = $routeParams.agencyId;
    $scope.routeId = $routeParams.routeId;
    $scope.tripgroupId = $routeParams.tripgroupId;
    $scope.detailMode = true;

    $scope.selectedStops = [];
    $scope.tg = Tripgroups.get({
      agencyId : $routeParams.agencyId,
      routeId : $routeParams.routeId,
      id : $routeParams.tripgroupId
    });
    $scope.tg.$promise.then(function(tg) {
      if (tg !== undefined) {
        $scope.tg.agencyId = $routeParams.agencyId;
        angular.forEach(tg.stops, function(stopId) {
          var stop = Stations.get({
            id : stopId
          });
          $scope.selectedStops.push(stop);
        });
      }
    });

    $scope.stops = [];
    $scope.refreshStops = function(query) {
      if (query === undefined || query === '') {
        return;
      }
      $scope.stops = Stations.queryStops({
        query : query
      });
    };

    $scope.selectedStop = {};
    $scope.addStop = function(stop) {
      var needAdd = true;
      angular.forEach($scope.selectedStops, function(selectedStop) {
        if (selectedStop.id === stop.id) {
          needAdd = false;
        }
      });
      if (needAdd) {
        $scope.selectedStops.push(stop);
      }
    };
    
    $scope.removeStop = function(stop) {
      var index = $scope.selectedStops.indexOf(stop);
      if (index !== -1) {
        $scope.selectedStops.splice(index, 1);
      }
    };

    $scope.submit = function() {

      $scope.alerts = [];
      $scope.error = {};

      var saveStops = [];
      for (var i = 0; i < $scope.selectedStops.length; i++) {
        saveStops.push($scope.selectedStops[i].id);
      }
      $scope.tg.stops = saveStops;
      console.log($scope.tg.stops);

      var start = +new Date();
      var tout = 100;
      var doSave = function(actualF) {
        actualF($scope.tg,
          function() {
            var tat = +new Date() - start;
              $timeout(function() {
                $scope.alerts.push({type: 'success', msg: '保存に成功しました。'});
                $scope.detailMode = true;
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

      doSave(Tripgroups.update);
    };

    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };
  });
