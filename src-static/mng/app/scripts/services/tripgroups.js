'use strict';

/**
 * @ngdoc service
 * @name mngApp.tripgroups
 * @description
 * # tripgroups
 * Service in the mngApp.
 */
angular.module('mngApp')
  .service('Tripgroups', function Tripgroups($resource) {
    return $resource('/api/tripgroups/:routeId/:id', {
        routeId: '@routeId',
        id: '@id'
      }, {
        query: {method:'GET', url:'/api/tripgroups/:routeId', isArray:true},
        update: {method:'PUT'},
        register: {method:'POST'},
        delete: {method:'DELETE'}
      });
  });
