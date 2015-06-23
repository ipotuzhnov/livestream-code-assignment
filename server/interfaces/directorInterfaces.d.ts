interface IDirector {
  livestream_id: number;
  full_name: string;
  dob: string;
  favorite_camera?: string;
  favorite_movies?: string[];
}

interface IDirectorController {
  listAll?: (req, res, next) => void;
  get?: (req, res, next) => void;
  post?: (req, res, next) => void;
  put?: (req, res, next) => void;
  delete?: (req, res, next) => void;
}