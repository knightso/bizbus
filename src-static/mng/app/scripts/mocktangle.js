'use strict';

var mocktangle = {};

mocktangle.mock = function (appName, dbURL) {
 
  var mockAppName = appName + 'Mock';

  angular.element("[ng-app='" + appName + "']").attr('ng-app', mockAppName);

  var mock = angular.module(mockAppName, [appName, 'ngMockE2E']);

  if (dbURL) {
    mock.factory('mockDB', function() {
      return new mocktangle.JsonDatabase(dbURL);
    });
  }

  return mock;
};

mocktangle.JsonDatabase = function(url) {
  this.database = JSON.parse(this._fetch(url))['tables'];
  this.table_name;
}

mocktangle.JsonDatabase.prototype._fetch = function(url) {
  var xhr = new XMLHttpRequest();
  var method = 'GET';
  var is_async = false;
  var json_string;

  xhr.open(method, url, is_async);
  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4 && xhr.status === 200) {
      json_string = xhr.responseText;
    }
  };
  xhr.send(null);
  return json_string;
};

mocktangle.JsonDatabase.prototype.selectTable = function(table_name) {
  if(table_name in this.database) {
    this.table_name = table_name;
    return true;
  }else {
    return false;
  }
};

mocktangle.JsonDatabase.prototype.getTable = function(table_name) {
  if(table_name in this.database) {
    return this.database[table_name];
  }else {
    return null;
  }
};

/**
 * 主キーでレコードを取得します。
 * @param  {number|string|Object|Array} key_values 複合主キーは{field_name: key_value, ...}で指定します。
 * @return {Array} 一致したレコードを返します。
 */
mocktangle.JsonDatabase.prototype.get = function(key_values) {
  var records = this.database[this.table_name]['records'];
  var primarykey_field = this.database[this.table_name]['primary_key'];
  var is_compound_key_table = false;
  var selected_records = [];
  var same_property_value = function(key, record) {
    for(var i in key) {
      if(key[i] != record[i]) {
        return false;
      }
    }
    return true;
  };

  // 複合主キーのテーブルか否か。
  if(primarykey_field.length > 1) {
    is_compound_key_table = true;
  }else {
    primarykey_field = primarykey_field[0];
  }

  // 引数が非Arrayであれば、Arrayに入れる。
  if(!Array.isArray(key_values)) {
    key_values = [key_values];
  }

  for (var ri = 0; ri < records.length; ri++) {
    for (var ki = 0; ki < key_values.length; ki++) {
      if(is_compound_key_table) {
        if(same_property_value(key_values[ki], records[ri])) {
          selected_records.push(records[ri]);
        }
      }else {
        if(records[ri][primarykey_field] == key_values[ki]) {
          selected_records.push(records[ri]);
        }
      }
    }
  }

  return selected_records;
};

/**
 * レコードがテーブルのフィールドと一致するか否か。
 * @param  {Object}  new_record 新しいレコード。
 * @param  {Object}  ext_record 既存のレコード。
 * @return {Boolean}
 */
mocktangle.JsonDatabase.prototype._is_record_match = function(new_record, ext_record) {
  for(var field in new_record) {
    if(!ext_record[field]){
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
mocktangle.JsonDatabase.prototype.insert = function(record) {
  var records = this.database[this.table_name]['records'];
  var primarykey_field = this.database[this.table_name]['primary_key'];

  if(!this._is_record_match(record, records[0])) {
    return false;
  }

  // 既存のレコードとの重複を確認する。
  for (var ri = 0; ri < records.length; ri++) {
    for(var ki=0; ki<primarykey_field.length; ki++) {
      if(records[ri][primarykey_field[ki]] == record[primarykey_field[ki]]) {
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
mocktangle.JsonDatabase.prototype.update = function(record) {
  var records = this.database[this.table_name]['records'];
  var primarykey_field = this.database[this.table_name]['primary_key'];

  if(!this._is_record_match(record, records[0])) {
    return false;
  }

  for (var ri = 0; ri < records.length; ri++) {
    for(var ki=0; ki<primarykey_field.length; ki++) {
      if(records[ri][primarykey_field[ki]] == record[primarykey_field[ki]]) {
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
mocktangle.JsonDatabase.prototype.remove = function(record) {
  var records = this.database[this.table_name]['records'];
  var primarykey_field = this.database[this.table_name]['primary_key'];

  if(!this._is_record_match(record, records[0])) {
    return false;
  }

  for (var ri = 0; ri < records.length; ri++) {
    for(var ki=0; ki<primarykey_field.length; ki++) {
      if(records[ri][primarykey_field[ki]] == record[primarykey_field[ki]]) {
        records.splice(ri, 1);
        return true;
      }
    }
  }
  console.log('Error: 一致するレコードがありません。');
  return false;
};
