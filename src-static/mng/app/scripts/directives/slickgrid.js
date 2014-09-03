'use strict';

/**
 * @ngdoc directive
 * @name mngApp.directive:slickGrid
 * @description
 * # slickGrid
 */
angular.module('mngApp')
  .directive('slickGrid', function () {
    return {
      restrict: 'EA',
      link : function(scope, element, attrs){
        // for clearer present I initialize data right in directive
        // start init data
        var columns = [
          {id: 'title', name: 'Title', field: 'title'},
          {id: 'duration', name: 'Duration', field: 'duration'},
          {id: '%', name: '% Complete', field: 'percentComplete'},
          {id: 'start', name: 'Start', field: 'start'},
          {id: 'finish', name: 'Finish', field: 'finish'},
          {id: 'effort-driven', name: 'Effort Driven', field: 'effortDriven'}
        ];
        var options = {
          enableCellNavigation: true,
          enableColumnReorder: true
        };
        var data = [];
        for (var i = 0; i < 50000; i++) {
          var d = (data[i] = {});

          d.id = 'id_' + i;
          d.num = i;
          d.title = 'Task ' + i;
          d.duration = '5 days';
          d.percentComplete = Math.round(Math.random() * 100);
          d.start = '01/01/2009';
          d.finish = '01/05/2009';
          d.effortDriven = (i % 5 === 0);
        }
        // end init data

        // finally render layout
        scope.grid = new Slick.Grid(element, data, columns, options);
        }
      };

    };
  });

