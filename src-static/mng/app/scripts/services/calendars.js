'use strict';

/**
 * @ngdoc service
 * @name mngApp.calendars
 * @description
 * # calendars
 * Service in the mngApp.
 */
angular.module('mngApp')
  .service('Calendars', function Calendars($resource) {
    return $resource('/api/calendars/:id', {
        id: '@id'
      }, {
        query: {method:'GET', url:'/api/calendars', isArray:true},
        queryByService: {method:'GET', url:'/api/services/:serviceId/calendars', isArray:true},
        update: {method:'PUT'},
        register: {method:'POST'},
        delete: {method:'DELETE'}
      });
  });
