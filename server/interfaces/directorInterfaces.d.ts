interface IDirector extends IModel {
  livestream_id: string;
  full_name: string;
  dob: string;
  favorite_camera?: string;
  favorite_movies?: string[];
}

interface IDirectorModel {
  listAll?: (cb: (err, result: any[]) => void) => void;
  get?: (id: string, cb: (err, result) => void) => void;
  set?: (id: string, val, cb: (err, result) => void) => void;
  remove?: (collectionName: string, id: string, cb: (err, result) => void) => void;
}
