'use strict';

/**
 * @ngdoc service
 * @name mngApp.Enums
 * @description
 * # Enums
 * Service in the mngApp.
 */
angular.module('mngApp')
  .service('Enums', function Enums() {
    return {
      directionTypes : [
        {name:'0', id:0},
        {name:'1', id:1}
      ],
      findDirectionType : function(id) {
        for (var i = 0; i < this.directionTypes.length; i++) {
          if (this.directionTypes[i].id === id) {
            return this.directionTypes[i];
          }
        }
        return null;
      },
      exceptionTypes : [
        {name:'Include', id:1},
        {name:'Exclude', id:2}
      ],
      findExceptionType : function(id) {
        for (var i = 0; i < this.exceptionTypes.length; i++) {
          if (this.exceptionTypes[i].id === id) {
            return this.exceptionTypes[i];
          }
        }
        return null;
      },
    };
  })
  .run(function ($rootScope, Enums) {
    $rootScope.Enums = Enums;
  });
