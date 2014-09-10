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
    return $resource('/api/agencies/:agencyId/routes/:routeId/tripgroups/:tripgroupId/trips/:id', {
        agencyId: '@agencyId',
        routeId: '@routeId',
        tripgroupId: '@tripgroupId',
        id: '@id'
      }, {
        query: {method:'GET', url:'/api/agencies/:agencyId/routes/:routeId/tripgroups/:tripgroupId/trips', isArray:true},
        update: {method:'PUT'},
        register: {method:'POST'},
        delete: {method:'DELETE'}
      });
  });
