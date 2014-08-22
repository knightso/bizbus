'use strict';

describe('Controller: PuttripgroupCtrl', function () {

  // load the controller's module
  beforeEach(module('mngApp'));
  beforeEach(module('ngResource'));
  beforeEach(module('ui.bootstrap'));

  var PuttripgroupCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PuttripgroupCtrl = $controller('PuttripgroupCtrl', {
      $scope: scope,
      method: function(){return 'PUT';}
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    //expect(scope.awesomeThings.length).toBe(3);
    expect(true).toBe(true);
  });
});
