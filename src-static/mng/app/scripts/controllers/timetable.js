'use strict';

/**
 * @ngdoc function
 * @name mngApp.controller:TimetableCtrl
 * @description
 * # TimetableCtrl
 * Controller of the mngApp
 */
angular.module('mngApp')
  .controller('TimetableCtrl', function ($scope, $stateParams, $timeout, Agencies, Routes, Tripgroups, $filter) {
    $scope.detailMode = true;
    
    $scope.agency = Agencies.get({
      id : $stateParams.agencyId
    });

    $scope.route = Routes.get({
      agencyId : $stateParams.agencyId,
      id : $stateParams.routeId
    });

    $scope.tg = Tripgroups.get({
      agencyId : $stateParams.agencyId,
      routeId : $stateParams.routeId,
      id : $stateParams.tripgroupId
    });

    var headerCellTemplate = 
          '<div class="btn-group" dropdown>' +
          '  <a href class="dropdown-toggle">' +
          '    {{col.displayName}}' +
          '  </a>' +
          '  <ul class="dropdown-menu" role="menu">' +
          '    <li><a>copy</a></li>' +
          '    <li><a>paste</a></li>' +
          '  </ul>' +
          '</div>'; 
        
    $scope.tg.$promise.then(function(tg) {
      $scope.columnDefs = [];
      $scope.columnDefs.push({field: 'stop', displayName: 'Stop', enableCellEdit: false, cellClass: 'grid-row-header'});
      angular.forEach(tg.trips, function(tripId, i) {
        $scope.columnDefs.push({field: 'trip'+i, displayName: tripId, enableCellEdit: true, headerCellTemplate: headerCellTemplate});
      });

      console.log($scope.columnDefs);

      $scope.gridData = [];
      angular.forEach(tg.stops, function(stopId, i) {
        var record = {stop: stopId};
        angular.forEach(tg.trips, function(tripId, j) {
          // dummy
          var hour = $filter('padzero')(i + j, 2);
          var min = $filter('padzero')(i + j + 10, 2);
          record['trip'+j] = hour + ':' + min;
        });
        $scope.gridData.push(record);
      });

      console.log($scope.gridData);

      $scope.gridOptions = { 
        data: 'gridData',
        showFooter: false,
        footerRowHeight: 0,
        enableSorting: false,
        enableCellSelection: true,
        enableRowSelection: false,
        enableCellEditOnFocus: true,
        columnDefs: $scope.columnDefs
      };
    });
  });
