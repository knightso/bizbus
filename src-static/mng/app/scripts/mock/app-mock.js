/*global mocktangle:false */
'use strict';

(function () {

  mocktangle.mock('mngApp', '/scripts/mock/testdata.json').run(['$httpBackend', 'mockDB', function($httpBackend, mockDB) {

    var agencies = mockDB.select('agencies');

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

    var routes = mockDB.select('routes');

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
      //var route = routes.get(routeId); // did not get it?
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

    $httpBackend.whenGET(/^\/api\/agencies\/[^\/]+\/routes+\/[^\/]+\/tripgroups$/).respond(function(method, url) {
      var strings = url.split('/');
      var routeId;
      for (var i = 0; i < strings.length; i++) {
        if (i === 5) {
          routeId = strings[i];
        }
      }
      var tgList = new Array();
      for (var i = 0; i < tripgroups.table.records.length; i++) {
        if (tripgroups.table.records[i].routeId === routeId) {
          tgList.push(tripgroups.table.records[i]);
        }
      }
     return [200, tgList];
    });

   $httpBackend.whenGET(/^\/api\/agencies\/[^\/]+\/routes+\/[^\/]+\/tripgroups+\/[^\/]+$/).respond(function(method, url) {
      var tgId = url.substring(url.lastIndexOf('/')+1);
      var tg;
      for (var i = 0; i < tripgroups.table.records.length; i++) {
        if (tripgroups.table.records[i].id === tgId) {
          tg = tripgroups.table.records[i];
        }
      }
      return [200, tg];
    });

    $httpBackend.whenPOST(/^\/api\/agencies\/[^\/]+\/routes+\/[^\/]+\/tripgroups+\/[^\/]+$/).respond({});
    $httpBackend.whenPUT(/^\/api\/agencies\/[^\/]+\/routes+\/[^\/]+\/tripgroups+\/[^\/]+$/).respond({});

    var stops = mockDB.select('stops');

    $httpBackend.whenGET(/^\/api\/stations+$/).respond(function() {
      var filtered = _.filter(stops.table.records, function(stop) {
        return stop.locationType === 1 || !stop.parentStation;
      });
      _.each(filtered, function(stop) {
        if (stop.locationType === 1) {
          stop.children = _.filter(stops.table.records, function(child) {
            return child.parentStation === stop.id;
          });
        }
      });
     return [200, filtered];
    });

    var terminals = mockDB.select('terminals');

    $httpBackend.whenGET(/^\/api\/terminals+$/).respond(terminals.table.records);

    $httpBackend.whenGET(/^\/api\/terminals\/[^\/]+$/).respond(function(method, url) {
      var id = url.substring(url.lastIndexOf('/')+1);
      var terminal;
      for (var i = 0; i < terminals.table.records.length; i++) {
        if (terminals.table.records[i].id === id) {
          terminal = terminals.table.records[i];
        }
      }
      return [200, terminal];
    });

    $httpBackend.whenPOST(/^\/api\/terminals\/[^\/]+$/).respond({});
    $httpBackend.whenPUT(/^\/api\/terminals\/[^\/]+$/).respond({});

    // htmlファイルの取得等はそのままスルー
    $httpBackend.whenGET(/.*/).passThrough();

  }]);

}());
