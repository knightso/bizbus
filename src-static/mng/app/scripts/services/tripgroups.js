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
    return $resource('/api/agencies/:agencyId/routes/:routeId/tripgroups/:id', {
        agencyId: '@agencyId',
        routeId: '@routeId',
        id: '@id'
      }, {
        query: {method:'GET', url:'/api/agencies/:agencyId/routes/:routeId/tripgroups', isArray:true},
        update: {method:'PUT'},
        register: {method:'POST'},
        delete: {method:'DELETE'}
      });
  });
