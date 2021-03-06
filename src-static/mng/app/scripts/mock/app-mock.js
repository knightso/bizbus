/*global mocktangle:false */
'use strict';

(function () {

  mocktangle.mock('mngApp', '/scripts/mock/testdata.json').run(['$httpBackend', 'mockDB', function($httpBackend, mockDB) {

    var agencies = mockDB.select('agencies');

    $httpBackend.whenGET(/^\/api\/agencies\/[^\/]+$/).respond(function(method, url) {
      var agencyId = url.substring(url.lastIndexOf('/')+1);
      var agency = agencies.get(agencyId);
      return [200, agency];
    });

    $httpBackend.whenGET(/^\/api\/agencies+$/).respond(agencies.table.records);

    $httpBackend.whenPOST(/^\/api\/agencies\/[^\/]+$/).respond({});
    $httpBackend.whenPUT(/^\/api\/agencies\/[^\/]+$/).respond({});

    var routes = mockDB.select('routes');

    $httpBackend.whenGET(/^\/api\/agencies\/[^\/]+\/routes$/).respond(function(method, url) {
      var agencyId = url.split('/')[3];
      var filtered = _.filter(routes.table.records, function(route) {
        return route.agencyId === agencyId;
      });
      return [200, filtered];
    });
 
    $httpBackend.whenGET(/^\/api\/agencies\/[^\/]+\/routes+\/[^\/]+$/).respond(function(method, url) {
      var routeId = url.substring(url.lastIndexOf('/')+1);
      var route = routes.get(routeId);
      return [200, route];
    });

    $httpBackend.whenPOST(/^\/api\/agencies\/[^\/]+\/routes+\/[^\/]+$/).respond({});
    $httpBackend.whenPUT(/^\/api\/agencies\/[^\/]+\/routes+\/[^\/]+$/).respond({});

    var tripgroups = mockDB.select('tripgroups');

    $httpBackend.whenGET(/^\/api\/agencies\/[^\/]+\/routes+\/[^\/]+\/tripgroups$/).respond(function(method, url) {
      var routeId = url.split('/')[5];
      var filtered = _.filter(tripgroups.table.records, function(tg) {
        console.log('tg.routeId=' + tg.routeId + ', routeId=' + routeId);
        return tg.routeId === routeId;
      });
     return [200, filtered];
    });

   $httpBackend.whenGET(/^\/api\/agencies\/[^\/]+\/routes+\/[^\/]+\/tripgroups+\/[^\/]+$/).respond(function(method, url) {
      var tgId = url.substring(url.lastIndexOf('/')+1);
      var tg = tripgroups.get(tgId);
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

    $httpBackend.whenGET(/^\/api\/stops\/[^\/]+$/).respond(function(method, url) {
      var query = url.substring(url.lastIndexOf('/')+1);
      if (query === undefined) {
        return [200, []];
      }
      var filtered = _.filter(stops.table.records, function(stop) {
        if (stop.locationType === undefined || stop.locationType === 0 || stop.locationType === '') {
          if (stop.name !== undefined && stop.name.indexOf(query) > 0) {
            return stop;
          }
        }
      });
     return [200, filtered];
    });

    $httpBackend.whenGET(/^\/api\/stations\/[^\/]+$/).respond(function(method, url) {
      var stopId = url.substring(url.lastIndexOf('/')+1);
      stopId = stopId.replace('%23','#');
      var filtered = _.filter(stops.table.records, function(stop) {
        if (stop.id === stopId) {
          return stop;
        }
      });
      if (filtered.length === 1) {
        return [200, filtered[0]];
      }else {
        return [404];
      }
    });

    $httpBackend.whenPOST(/^\/api\/stations\/[^\/]+$/).respond({});
    $httpBackend.whenPUT(/^\/api\/stations\/[^\/]+$/).respond({});

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

    var services = mockDB.select('services');

    $httpBackend.whenGET(/^\/api\/services+$/).respond(services.table.records);

    $httpBackend.whenGET(/^\/api\/services\/[^\/]+$/).respond(function(method, url) {
      var id = url.substring(url.lastIndexOf('/')+1);
      var service;
      for (var i = 0; i < services.table.records.length; i++) {
        if (services.table.records[i].id === id) {
          service = services.table.records[i];
        }
      }
      return [200, service];
    });

    $httpBackend.whenPOST(/^\/api\/services\/[^\/]+$/).respond({});
    $httpBackend.whenPUT(/^\/api\/services\/[^\/]+$/).respond({});

    var calendars = mockDB.select('calendars');
    $httpBackend.whenGET(/^\/api\/services\/[^\/]+\/calendars+$/).respond(function(method, url) {
      var serviceId = url.split('/')[3];
      var filtered = _.filter(calendars.table.records, function(calendars) {
        return calendars.serviceId === serviceId;
      });
      return [200, filtered];
    });

    var calendarDates = mockDB.select('calendar_dates');
    $httpBackend.whenGET(/^\/api\/services\/[^\/]+\/calendardates+$/).respond(function(method, url) {
      var serviceId = url.split('/')[3];
      var filtered = _.filter(calendarDates.table.records, function(calendarDates) {
        return calendarDates.serviceId === serviceId;
      });
      return [200, filtered];
    });

    var trips = mockDB.select('trips');

    $httpBackend.whenGET(/^\/api\/agencies\/[^\/]+\/routes+\/[^\/]+\/tripgroups+\/[^\/]+\/trips+$/).respond(function(method, url) {
      var tgIdString = url.split('/')[7];
      var tripgroupId;
      if (tgIdString === undefined || tgIdString === '') {
        return [200, []];
      } else {
        tripgroupId = parseInt(tgIdString);
      }
      var filtered = _.filter(trips.table.records, function(trip) {
        return trip.tripGroupId === tripgroupId;
      });
      return [200, filtered];
    });

    $httpBackend.whenGET(/^\/api\/agencies\/[^\/]+\/routes+\/[^\/]+\/tripgroups+\/[^\/]+\/trips\/[^\/]+$/).respond(function(method, url) {
      var tripId = url.substring(url.lastIndexOf('/')+1);
      var trip = trips.get(tripId);
      return [200, trip];
    });

    $httpBackend.whenPOST(/^\/api\/agencies\/[^\/]+\/routes+\/[^\/]+\/tripgroups+\/[^\/]+\/trips\/[^\/]+$/).respond({});
    $httpBackend.whenPUT(/^\/api\/agencies\/[^\/]+\/routes+\/[^\/]+\/tripgroups+\/[^\/]+\/trips\/[^\/]+$/).respond({});

    // htmlファイルの取得等はそのままスルー
    $httpBackend.whenGET(/.*/).passThrough();

  }]);

}());
