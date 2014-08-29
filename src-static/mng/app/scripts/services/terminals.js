'use strict';

/**
 * @ngdoc service
 * @name mngApp.terminals
 * @description
 * # terminals
 * Service in the mngApp.
 */
angular.module('mngApp')
  .service('Terminals', function Terminals($resource) {
    return $resource('/api/terminals/:id', {
        id: '@id'
      }, {
        query: {method:'GET', url:'/api/terminals', isArray:true},
        update: {method:'PUT'},
        register: {method:'POST'},
        delete: {method:'DELETE'}
      });
  });
