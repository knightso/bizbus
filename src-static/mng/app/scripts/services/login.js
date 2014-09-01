'use strict';

/**
 * @ngdoc service
 * @name mngApp.login
 * @description
 * # login
 * Service in the mngApp.
 */
angular.module('mngApp')
  .service('login', function login() {
    this.getLoginUser = function() {
      return "hoge";
    };
  });
