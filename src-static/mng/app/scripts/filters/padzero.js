'use strict';

/**
 * @ngdoc filter
 * @name mngApp.filter:padzero
 * @function
 * @description
 * # padzero
 * Filter in the mngApp.
 */
angular.module('mngApp')
  .filter('padzero', function () {
    return function (n, len) {
      var num = parseInt(n, 10);
      len = parseInt(len, 10);
      if (isNaN(num) || isNaN(len)) {
        return n;
      }
      num = ''+num;
      while (num.length < len) {
        num = '0'+num;
      }
      return num;
    };
  });
  
  
