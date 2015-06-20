/// <reference path="../_all.ts" />

import db = require('../db');

class Director implements IDirectorModel {
  private _obj: IDirector;
  
  constructor(obj: IDirector) {
    this._obj = obj;
  }
  
  get livestream_id() {
    return this._obj.livestream_id;
  }
  
  get full_name() {
    return this._obj.full_name;
  }
  
  get dob() {
    return this._obj.dob;
  }
}

var directorModel = db.model('directors', Director);

export = directorModel;