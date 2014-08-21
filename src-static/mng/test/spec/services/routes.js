'use strict';

describe('Service: routes', function () {

  // load the service's module
  beforeEach(module('mngApp'));
  beforeEach(module('ngResource'));
  beforeEach(module('ui.bootstrap'));

  // instantiate service
  var Routes;
  beforeEach(inject(function (_Routes_) {
    Routes = _Routes_;
  }));

  it('should do something', function () {
    expect(!!Routes).toBe(true);
  });

});

