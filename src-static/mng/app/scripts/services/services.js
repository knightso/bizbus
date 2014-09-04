'use strict';

/**
 * @ngdoc service
 * @name mngApp.services
 * @description
 * # services
 * Service in the mngApp.
 */
angular.module('mngApp')
  .service('Services', function Services($resource) {
    return $resource('/api/services/:id', {
        id: '@id'
      }, {
        query: {method:'GET', url:'/api/services', isArray:true},
        update: {method:'PUT'},
        register: {method:'POST'},
        delete: {method:'DELETE'}
      });
  });
