interface Error {
  status?: number;
}

interface IDirector {
  livestream_id: string;
  full_name: string;
  dob: string;
  favorite_camera?: string;
  fovorite_movies?: string [];
}

interface IDirectorModel {
  listAll: () => IDirector [];
}