'use strict';

/**
 * @ngdoc service
 * @name mngApp.stops
 * @description
 * # stops
 * Service in the mngApp.
 */
angular.module('mngApp')
  .service('Stations', function Stations($resource) {
    return $resource('/api/stations/:id', {
        id: '@id'
      }, {
        query: {method:'GET', url:'/api/stations', isArray:true},
        update: {method:'PUT'},
        register: {method:'POST'},
        delete: {method:'DELETE'}
      });
  });
