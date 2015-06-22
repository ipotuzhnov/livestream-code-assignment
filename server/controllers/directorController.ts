/// <reference path="../_all.d.ts" />

var directorController = (Director: IDirector) => {
	
	var listAll = (req, res, next) => {
		Director.listAll((err, result) => {
			if (err) {
				next(err);
			} else if (result) {
				res.status(200).send(result);
			} else {
				var error = new Error('Not Found');
				error.status = 404;
				next(error);
			}
		});
	};
	
	var get = (req, res, next) => {
		Director.get(req.params.id, (err, result) => {
			if (err) {
				return next(err);
			}
			
			if (result) {
				res.status(200).send(result);
			} else {
				var error = new Error('Not Found');
				error.status = 404;
				next(error);
			}
		});
	};
	
	return {
		listAll,
		get
	};
	
};

export = directorController;
