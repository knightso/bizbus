'use strict';

/**
 * @ngdoc service
 * @name mngApp.trips
 * @description
 * # trips
 * Service in the mngApp.
 */
angular.module('mngApp')
  .service('Trips', function Trips($resource) {
    return $resource('/api/trips/:id', {
        id: '@id'
      }, {
        query: {method:'GET', url:'/api/trips', isArray:true},
        update: {method:'PUT'},
        register: {method:'POST'},
        delete: {method:'DELETE'}
      });
  });
