'use strict';

/**
 * @ngdoc function
 * @name mngApp.controller:TripgroupstopsCtrl
 * @description
 * # TripgroupstopsCtrl
 * Controller of the mngApp
 */
angular.module('mngApp')
  .controller('TripgroupstopsCtrl', function ($scope, $routeParams, $http, Tripgroups) {//Stations
    $scope.charLimit = 15;
    $scope.agencyId = $routeParams.agencyId;
    $scope.routeId = $routeParams.routeId;
    $scope.tripgroupId = $routeParams.tripgroupId;

    $scope.tg = Tripgroups.get({
      agencyId : $routeParams.agencyId,
      routeId : $routeParams.routeId,
      id : $routeParams.tripgroupId
    });

    $scope.stops = [];
    $scope.refreshStops = function(query) {
      if (query === undefined || query === '') {
        return;
      }
      var params = {query: query};
      return $http.get(
        '/api/stops',
        {params: params}
      ).then(function(response) {console.log(response.data.length);
        $scope.stops = response.data;
      });
    };

    $scope.selectedStops = [];$scope.index=1;
    $scope.addStop = function(stop) {console.log(stop);
      //$scope.selectedStops.push(stop);
      $scope.selectedStops.push({id:$scope.index, name:'bb'+$scope.index});
$scope.index=$scope.index+1;
    };
    
    $scope.removeStop = function(stop) {
      var index = $scope.selectedStops.indexOf(stop);
      $scope.selectedStops.splice(index, 1);
    };
  });
