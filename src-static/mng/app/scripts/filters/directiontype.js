'use strict';

/**
 * @ngdoc filter
 * @name mngApp.filter:directionType
 * @function
 * @description
 * # directionType
 * Filter in the mngApp.
 */
angular.module('mngApp')
  .filter('directionType', function (Enums) {
    return function (id) {
      var directionType = Enums.findDirectionType(id);
      return directionType ? directionType.name : 'error';
    };
  });
