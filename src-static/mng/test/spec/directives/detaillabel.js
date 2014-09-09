'use strict';

describe('Directive: detailLabel', function () {

  // load the directive's module
  beforeEach(module('mngApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<detail-label></detail-label>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the detailLabel directive');
  }));
});
