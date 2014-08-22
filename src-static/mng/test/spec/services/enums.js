'use strict';

describe('Service: Enums', function () {

  // load the service's module
  beforeEach(module('mngApp'));

  // instantiate service
  var Enums;
  beforeEach(inject(function (_Enums_) {
    Enums = _Enums_;
  }));

  it('should do something', function () {
    expect(!!Enums).toBe(true);
  });

});
