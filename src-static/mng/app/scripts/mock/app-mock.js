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

    $httpBackend.whenPOST(/^\/api\/agencies\/[^\/]+$/).respond({});
    $httpBackend.whenPUT(/^\/api\/agencies\/[^\/]+$/).respond({});

    var routes = mockDB.select('route');

    $httpBackend.whenGET(/^\/api\/routes\/[^\/]+$/).respond(function(method, url) {
      var agencyId = url.substring(url.lastIndexOf('/')+1);
      var routeList = new Array();
      for (var i = 0; i < routes.table.records.length; i++) {
        if (routes.table.records[i].agencyId === agencyId) {
          routeList.push(routes.table.records[i]);
        }
      }
     return [200, routeList];
    });

    $httpBackend.whenGET(/^\/api\/routes\/[^\/]+\/[^\/]+$/).respond(function(method, url) {
      var routeId = url.substring(url.lastIndexOf('/')+1);
      var route;
      for (var i = 0; i < routes.table.records.length; i++) {
        if (routes.table.records[i].id === routeId) {
          route = routes.table.records[i];
        }
      }
      return [200, route];
    });

    $httpBackend.whenPOST(/^\/api\/routes\/[^\/]+\/[^\/]+$/).respond({});
    $httpBackend.whenPUT(/^\/api\/routes\/[^\/]+\/[^\/]+$/).respond({});

    var tripgroups = mockDB.select('tripgroups');

    $httpBackend.whenGET(/^\/api\/tripgroups\/[^\/]+$/).respond(function(method, url) {
      var routeId = url.substring(url.lastIndexOf('/')+1);
      var tgList = new Array();
      for (var i = 0; i < tripgroups.table.records.length; i++) {
        if (tripgroups.table.records[i].routeId === routeId) {
          tgList.push(tripgroups.table.records[i]);
        }
      }
     return [200, tgList];
    });

   $httpBackend.whenGET(/^\/api\/tripgroups\/[^\/]+\/[^\/]+$/).respond(function(method, url) {
      var tgId = url.substring(url.lastIndexOf('/')+1);
      var tg;
      for (var i = 0; i < tripgroups.table.records.length; i++) {
        if (tripgroups.table.records[i].id === tgId) {
          tg = tripgroups.table.records[i];
        }
      }
      return [200, tg];
    });

    $httpBackend.whenPOST(/^\/api\/tripgroups\/[^\/]+\/[^\/]+$/).respond({});
    $httpBackend.whenPUT(/^\/api\/tripgroups\/[^\/]+\/[^\/]+$/).respond({});

    // htmlファイルの取得等はそのままスルー
    $httpBackend.whenGET(/.*/).passThrough();

  }]);

}());
