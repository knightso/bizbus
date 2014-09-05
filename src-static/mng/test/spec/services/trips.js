'use strict';

describe('Service: trips', function () {

  // load the service's module
  beforeEach(module('mngApp'));

  // instantiate service
  var Trips;
  beforeEach(inject(function (_Trips_) {
    Trips = _Trips_;
  }));

  it('should do something', function () {
    expect(!!Trips).toBe(true);
  });

});
