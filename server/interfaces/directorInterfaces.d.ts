interface IDirector extends IModel {
  livestream_id: string;
  full_name: string;
  dob: string;
  favorite_camera?: string;
  favorite_movies?: string[];
}

interface IDirectorModel {
  listAll: (cb: (err, res) => void) => void;
  get: (id: string, cb: (err, res) => void) => void;
  set: (id: string, val, cb: (err, res) => void) => void;
}
