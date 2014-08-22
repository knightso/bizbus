'use strict';

describe('Service: tripgroups', function () {

  // load the service's module
  beforeEach(module('mngApp'));
  beforeEach(module('ngResource'));
  beforeEach(module('ui.bootstrap'));

  // instantiate service
  var Tripgroups;
  beforeEach(inject(function (_Tripgroups_) {
    Tripgroups = _Tripgroups_;
  }));

  it('should do something', function () {
    expect(!!Tripgroups).toBe(true);
  });

});
