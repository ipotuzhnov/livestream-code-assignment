interface IDirector {
  livestream_id: string;
  full_name: string;
  dob: string;
  favorite_camera?: string;
  fovorite_movies?: string[];
}

interface IDirectorModel {
  listAll?: (callback: (err, results: IDirector[]) => void) => void;
}
