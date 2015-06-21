/// <reference path="../_all.d.ts" />

import db = require('../db');

/*
class Director implements IDirector {
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
  
  get favorite_camera() {
    return this._obj.favorite_camera;
  }
  
  set favorite_camera(val: string) {
    this._obj.favorite_camera = val;
  }
  
  get favorite_movies() {
    return this._obj.favorite_movies;
  }
  
  set favorite_movies(val: string[]) {
    this._obj.favorite_movies = val;
  }
}
*/

var directorModel = db.model('directors');

export = directorModel;