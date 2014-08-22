'use strict';

describe('Service: stops', function () {

  // load the service's module
  beforeEach(module('mngApp'));

  // instantiate service
  var Stations;
  beforeEach(inject(function (_Stations_) {
    Stations = _Stations_;
  }));

  it('should do something', function () {
    expect(!!Stations).toBe(true);
  });

});
