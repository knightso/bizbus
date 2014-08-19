'use strict';

/**
 * @ngdoc service
 * @name mngApp.Agencies
 * @description
 * # Agencies
 * Service in the mngApp.
 */
angular.module('mngApp')
  .service('Agencies', function Agencies($resource) {
    return $resource('/api/agencies/:id', {
        id: '@id'
      }, {
        query: {method:'GET', url:'/api/agencies', isArray:true},
        update: {method:'PUT'},
        register: {method:'POST'},
        delete: {method:'DELETE'}
      });
  });
