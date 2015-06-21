/// <reference path="../_all.d.ts" />

var directorController = (Director: IDirector) => {
	var listAll = (req, res, next) => {
		Director.listAll((err, results) => {
			if (err) {
				return next(err);
			}
			
			//console.log(results);
			res.send(results);
		});
	};
	
	return {
		listAll
	};
};

export = directorController;
