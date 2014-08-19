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
    tables[name] = new mocktangle.JsonTable(jsonTable);
  });
  this.tables = tables;
};

mocktangle.JsonDatabase.prototype.select = function(tableName) {
  return this.tables[tableName];
};

mocktangle.JsonTable = function(table) {
  this.table = table;
};

/**
 * 主キーでレコードを取得します。
 * @param  {number|string|Object|Array} keyValues 複合主キーは{field_name: key_value, ...}で指定します。
 * @return {Array} 一致したレコードを返します。
 */
mocktangle.JsonTable.prototype.get = function(keyValues) {
  var records = this.table.records;
  var primarykeyField = this.table.pk;
  var isCompoundKeyTable = false;
  var selectedRecords = [];
  var samePropertyValue = function(key, record) {
    for(var i in key) {
      if(key[i] !== record[i]) {
        return false;
      }
    }
    return true;
  };

  // 複合主キーのテーブルか否か。
  if(primarykeyField.length > 1) {
    isCompoundKeyTable = true;
  }else {
    primarykeyField = primarykeyField[0];
  }

  // 引数が非Arrayであれば、Arrayに入れる。
  if(!Array.isArray(keyValues)) {
    keyValues = [keyValues];
  }

  for (var ri = 0; ri < records.length; ri++) {
    for (var ki = 0; ki < keyValues.length; ki++) {
      if(isCompoundKeyTable) {
        if(samePropertyValue(keyValues[ki], records[ri])) {
          selectedRecords.push(records[ri]);
        }
      }else {
        if(records[ri][primarykeyField] === keyValues[ki]) {
          selectedRecords.push(records[ri]);
        }
      }
    }
  }

  return selectedRecords.length > 0 ? selectedRecords[0] : null;
};

/**
 * レコードがテーブルのフィールドと一致するか否か。
 * @param  {Object}  newRecord 新しいレコード。
 * @param  {Object}  extRecord 既存のレコード。
 * @return {Boolean}
 */
  mocktangle.JsonTable.prototype._isRecordMatch = function(newRecord, extRecord) {
  for(var field in newRecord) {
    if(!extRecord[field]){
      console.log('Error: フィールドが一致しません。');
      return false;
    }
  }
  return true;
};

/**
 * レコードを1件追加します。
 * @param  {object} record 追加するテーブルのレコード。
 * @return {Boolean}
 */
mocktangle.JsonTable.prototype.insert = function(record) {
  var records = this.table.records;
  var primarykeyField = this.table.pk;

  if(!this._isRecordMatch(record, records[0])) {
    return false;
  }

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

  if(!this._isRecordMatch(record, records[0])) {
    return false;
  }

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

  if(!this._isRecordMatch(record, records[0])) {
    return false;
  }

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
