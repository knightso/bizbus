'use strict';

describe('Controller: AgenciesCtrl', function () {

  // load the controller's module
  beforeEach(module('mngApp'));

  var AgenciesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AgenciesCtrl = $controller('AgenciesCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
