'use strict';

/**
 * @ngdoc directive
 * @name mngApp.directive:detailLabel
 * @description
 * # detailLabel
 */
angular.module('mngApp')
  .directive('detailLabel', function () {
    return {
      template: '<span>{{!detailMode && (method=="POST" && "登録" || "編集") || ""}}</span>',
      restrict: 'E',
      link: function postLink(scope, element, attrs, $state) {
      }
    };
  });
