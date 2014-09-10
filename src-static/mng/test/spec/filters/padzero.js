'use strict';

describe('Filter: padzero', function () {

  // load the filter's module
  beforeEach(module('mngApp'));

  // initialize a new instance of the filter before each test
  var padzero;
  beforeEach(inject(function ($filter) {
    padzero = $filter('padzero');
  }));

  it('should return the input prefixed with "padzero filter:"', function () {
    var text = 'angularjs';
    expect(padzero(text)).toBe('padzero filter: ' + text);
  });

});
