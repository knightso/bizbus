'use strict';

/**
 * @ngdoc filter
 * @name mngApp.filter:exceptionType
 * @function
 * @description
 * # exceptionType
 * Filter in the mngApp.
 */
angular.module('mngApp')
  .filter('exceptionType', function (Enums) {
    return function (id) {
      if (id === null || id === undefined) {
        return id;
      }
      var exceptionType = Enums.findExceptionType(id);
      return exceptionType ? exceptionType.name : 'error';
    };
  });
