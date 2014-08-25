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

    $httpBackend.whenGET(/^\/api\/agencies\/[^\/]+\/routes$/).respond(function(method, url) {
      var strings = url.split('/');
      var agencyId;
      for (var i = 0; i < strings.length; i++) {
        if (i === 3) {
          agencyId = strings[i];
        }
      }
      var routeList = new Array();
      for (var i = 0; i < routes.table.records.length; i++) {
        if (routes.table.records[i].agencyId === agencyId) {
          routeList.push(routes.table.records[i]);
        }
      }
     return [200, routeList];
    });
 
    $httpBackend.whenGET(/^\/api\/agencies\/[^\/]+\/routes+\/[^\/]+$/).respond(function(method, url) {
      var routeId = url.substring(url.lastIndexOf('/')+1);
      var route;
      for (var i = 0; i < routes.table.records.length; i++) {
        if (routes.table.records[i].id === routeId) {
          route = routes.table.records[i];
        }
      }
      return [200, route];
    });

    $httpBackend.whenPOST(/^\/api\/agencies\/[^\/]+\/routes+\/[^\/]+$/).respond({});
    $httpBackend.whenPUT(/^\/api\/agencies\/[^\/]+\/routes+\/[^\/]+$/).respond({});

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

    var stops = mockDB.select('stops');

    $httpBackend.whenGET(/^\/api\/stations+$/).respond(function() {
      for (var i = 0; i < stops.table.records.length; i++) {
        var stIndex = i+1;
        var stopList = new Array();
        for (var j = 1; j < 4; j++) {
          var stop = new Object();
          stop.id = 'stop' + stIndex + j;
          stop.name = 'stop_name_' + stIndex + '_' + j;
          stop.desc = 'stop_desc_' + stIndex + ':' + stops.table.records[i].id + '_' + j;
          stop.lat = 31.098723+j;
          stop.lon = 136.823912+j;
          stop.locationType = 0;
          stop.parentStation = stops.table.records[i].id;
          stopList.push(stop);
        }
        stops.table.records[i].locationType = 1;
        stops.table.records[i].stops = stopList;
      }
     return [200, stops.table.records];
    });

    // htmlファイルの取得等はそのままスルー
    $httpBackend.whenGET(/.*/).passThrough();

  }]);

}());
