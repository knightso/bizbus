'use strict';

describe('Controller: PutagencyCtrl', function () {

  // load the controller's module
  beforeEach(module('mngApp'));

  var PutagencyCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PutagencyCtrl = $controller('PutagencyCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
