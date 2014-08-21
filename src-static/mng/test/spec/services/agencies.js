'use strict';

describe('Service: Agencies', function () {

  // load the service's module
  beforeEach(module('mngApp'));
  beforeEach(module('ngResource'));
  beforeEach(module('ui.bootstrap'));

  // instantiate service
  var Agencies;
  beforeEach(inject(function (_Agencies_) {
    Agencies = _Agencies_;
  }));

  it('should do something', function () {
    expect(!!Agencies).toBe(true);
  });

});
