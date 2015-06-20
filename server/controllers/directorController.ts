/// <reference path="../_all.ts" />

var directorController = (Director) => {
	var get = (req, res, next) => {
		Director.listAll((err, results) => {
			if (err) {
				return next(err); 
			}
			
			console.log(results);
			res.send(results);
		});
	};
	
	return {
		get
	};
};

export = directorController;
