'use strict';

describe('Service: calendarDates', function () {

  // load the service's module
  beforeEach(module('mngApp'));

  // instantiate service
  var Calendardates;
  beforeEach(inject(function (_Calendardates_) {
    Calendardates = _Calendardates_;
  }));

  it('should do something', function () {
    expect(!!Calendardates).toBe(true);
  });

});
