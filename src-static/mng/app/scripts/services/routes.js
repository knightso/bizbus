'use strict';

/**
 * @ngdoc service
 * @name mngApp.routes
 * @description
 * # routes
 * Service in the mngApp.
 */
angular.module('mngApp')
  .service('Routes', function Routes($resource) {
    return $resource('/api/routes/:agencyId/:id', {
        agencyId: '@agencyId',
        id: '@id'
      }, {
        query: {method:'GET', url:'/api/routes/:agencyId', isArray:true},
        update: {method:'PUT'},
        register: {method:'POST'},
        delete: {method:'DELETE'}
      });
  });
