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
    this.loginUser = null;
    this.getLoginUser = function() {
      return this.loginUser;
    };

    this.login = function(id, pass) {
      console.log('id=' + id +', pass=' + pass);
      this.loginUser = {name: '山田太郎'};
    };
  });
