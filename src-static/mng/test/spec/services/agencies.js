'use strict';

describe('Service: Agencies', function () {

  // load the service's module
  beforeEach(module('mngApp'));

  // instantiate service
  var Agencies;
  beforeEach(inject(function (_Agencies_) {
    Agencies = _Agencies_;
  }));

  it('should do something', function () {
    expect(!!Agencies).toBe(true);
  });

});
