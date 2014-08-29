'use strict';

describe('Service: terminals', function () {

  // load the service's module
  beforeEach(module('mngApp'));

  // instantiate service
  var Terminals;
  beforeEach(inject(function (_Terminals_) {
    Terminals = _Terminals_;
  }));

  it('should do something', function () {
    expect(!!Terminals).toBe(true);
  });

});
