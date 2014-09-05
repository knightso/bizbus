'use strict';

describe('Service: calendars', function () {

  // load the service's module
  beforeEach(module('mngApp'));

  // instantiate service
  var Calendars;
  beforeEach(inject(function (_Calendars_) {
    Calendars = _Calendars_;
  }));

  it('should do something', function () {
    expect(!!Calendars).toBe(true);
  });

});
