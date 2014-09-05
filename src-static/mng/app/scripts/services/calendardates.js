'use strict';

/**
 * @ngdoc service
 * @name mngApp.calendarDates
 * @description
 * # calendarDates
 * Service in the mngApp.
 */
angular.module('mngApp')
  .service('Calendardates', function Calendardates($resource) {
    return $resource('/api/calendardates/:id', {
        id: '@id'
      }, {
        query: {method:'GET', url:'/api/calendardates', isArray:true},
        queryByService: {method:'GET', url:'/api/services/:serviceId/calendardates', isArray:true},
        update: {method:'PUT'},
        register: {method:'POST'},
        delete: {method:'DELETE'}
      });
  });
