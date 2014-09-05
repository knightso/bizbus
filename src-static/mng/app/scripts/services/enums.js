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
        {name:'下り', id:0},
        {name:'上り', id:1}
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
        {name:'追加', id:1},
        {name:'除外', id:2}
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
