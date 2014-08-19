/*global mocktangle:false */
'use strict';

(function () {

  mocktangle.mock('mngApp', '/scripts/testdata.json').run(['$httpBackend', function($httpBackend) {

    $httpBackend.whenGET(/^\/api\/agencies\/[^\/]+$/).respond(function(method, url) {
      var ringId = url.substring(url.lastIndexOf('/')+1);
      return [200, {ringId: ringId}];
    });

    // htmlファイルの取得等はそのままスルー
    $httpBackend.whenGET(/.*/).passThrough();

  }]);

}());
