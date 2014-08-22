'use strict';

describe('Filter: directionType', function () {

  // load the filter's module
  beforeEach(module('mngApp'));

  // initialize a new instance of the filter before each test
  var directionType;
  beforeEach(inject(function ($filter) {
    directionType = $filter('directionType');
  }));

  it('should return the input id with text:', function () {
    var id = 0;
    expect(directionType(id)).toBe('下り');
  });

});
