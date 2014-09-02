'use strict';

var mocktangle = {};

mocktangle.mock = function (appName, dbURL) {
 
  var mockAppName = appName + 'Mock';

  angular.element('[ng-app="' + appName + '"]').attr('ng-app', mockAppName);

  var mock = angular.module(mockAppName, [appName, 'ngMockE2E']);

  if (dbURL) {
    mock.factory('mockDB', function() {
      return new mocktangle.JsonDatabase(mocktangle._fetch(dbURL));
    });
  }

  return mock;
};

mocktangle._fetch = function(url) {
  var xhr = new XMLHttpRequest();
  var method = 'GET';
  var isAsync = false;
  var jsonString;

  xhr.open(method, url, isAsync);
  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4 && xhr.status === 200) {
      jsonString = xhr.responseText;
    }
  };
  xhr.send(null);
  return jsonString;
};

mocktangle.JsonDatabase = function(json) {
  var jsonTables = JSON.parse(json).tables;
  var tables = {};
  angular.forEach(jsonTables, function(jsonTable, name) {
    tables[name] = new mocktangle.JsonTable(name, jsonTable);
  });
  this.tables = tables;
};

mocktangle.JsonDatabase.prototype.select = function(tableName) {
  return this.tables[tableName];
};

mocktangle.JsonTable = function(name, table) {
  this.name = name;
  this.table = table;
};

/**
 * 主キーでレコードを取得します。
 * @param  {number|string|Object} pk 複合主キーは{field_name: key_value, ...}で指定します。
 * @return {Object} 一致したレコードを返します。
 */
mocktangle.JsonTable.prototype.get = function(pk) {
  pk = this._toPkObj(pk);
  var index = this._indexOf(pk);
  return index >= 0 ? this.table.records[index] : null;
};

/**
 * レコードを1件追加します。
 * @param  {object} record 追加するテーブルのレコード。
 * @return {Boolean}
 */
mocktangle.JsonTable.prototype.insert = function(record) {
  var records = this.table.records;
  var primarykeyField = this.table.pk;

  // 既存のレコードとの重複を確認する。
  for (var ri = 0; ri < records.length; ri++) {
    for(var ki=0; ki<primarykeyField.length; ki++) {
      if(records[ri][primarykeyField[ki]] === record[primarykeyField[ki]]) {
        console.log('Error: 既に同じ主キーのレコードが存在します。');
        return false;
      }
    }
  }
  records.push(record);
  return true;
};

/**
 * 既存のレコードを更新します。
 * @param  {Object} record 
 * @return {Boolean}
 */
mocktangle.JsonTable.prototype.update = function(record) {
  var records = this.table.records;
  var primarykeyField = this.table.pk;

  for (var ri = 0; ri < records.length; ri++) {
    for(var ki=0; ki<primarykeyField.length; ki++) {
      if(records[ri][primarykeyField[ki]] === record[primarykeyField[ki]]) {
        records[ri] = record;
        return true;
      }
    }
  }
  console.log('Error: 一致するレコードがありません。');
  return false;
};


/**
 * 既存のレコードを1件削除します。
 * @param  {Object} record
 * @return {Boolean}
 */
mocktangle.JsonTable.prototype.delete = function(record) {
  var records = this.table.records;
  var primarykeyField = this.table.pk;

  for (var ri = 0; ri < records.length; ri++) {
    for(var ki=0; ki<primarykeyField.length; ki++) {
      if(records[ri][primarykeyField[ki]] === record[primarykeyField[ki]]) {
        records.splice(ri, 1);
        return true;
      }
    }
  }
  console.log('Error: 一致するレコードがありません。');
  return false;
};

mocktangle.JsonTable.prototype._toPkObj = function(pk) {
  var newPk = {};
  for (var i = 0; i < this.table.pk.length; i++) {
    var pkname = this.table.pk[i];
    newPk[pkname] = (typeof pk === 'object') ? pk[pkname] : pk;
  }
  return newPk;
};

mocktangle.JsonTable.prototype._indexOf = function(pk) {
  for (var i = 0; i < this.table.records.length; i++) {
    if (mocktangle._isPropertyMatched(this.table.records[i], pk)) {
      return i;
    }
  }
  return -1;
};

mocktangle._isPropertyMatched = function(obj, props) {
  for (var name in props) {
    if (obj[name] !== props[name]) {
      return false;
    }
  }
  return true;
};

