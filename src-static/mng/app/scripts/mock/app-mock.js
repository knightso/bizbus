/*global mocktangle:false */
'use strict';

(function () {

  mocktangle.mock('mngApp', '/scripts/mock/testdata.json').run(['$httpBackend', 'mockDB', function($httpBackend, mockDB) {

    var agencies = mockDB.select('agency');

    $httpBackend.whenGET(/^\/api\/agencies\/[^\/]+$/).respond(function(method, url) {
      var id = url.substring(url.lastIndexOf('/')+1);
      var agency;
      for (var i = 0; i < agencies.table.records.length; i++) {
        if (agencies.table.records[i].id === id) {
          agency = agencies.table.records[i];
        }
      }
      return [200, agency];
    });

    $httpBackend.whenGET(/^\/api\/agencies+$/).respond(agencies.table.records);

    $httpBackend.whenPOST(/^\/api\/agencies+$/).respond({});
    $httpBackend.whenPUT(/^\/api\/agencies\/[^\/]+$/).respond({});

    var routes = mockDB.select('route');
    $httpBackend.whenGET(/^\/api\/routes\/[^\/]+$/).respond(routes.table.records);

    $httpBackend.whenGET(/^\/api\/routes\/[^\/]+$/).respond(function(method, url) {
      var id = url.substring(url.lastIndexOf('/')+1);
      var route;
      for (var i = 0; i < routes.table.records.length; i++) {
        if (routes.table.records[i].id === id) {
          route = routes.table.records[i];
        }
      }
      return [200, route];
    });

    //$httpBackend.whenPOST(/^\/api\/routes+$/).respond({});
    //$httpBackend.whenPUT(/^\/api\/routes\/[^\/]+$/).respond({});

    // htmlファイルの取得等はそのままスルー
    $httpBackend.whenGET(/.*/).passThrough();

  }]);

}());
