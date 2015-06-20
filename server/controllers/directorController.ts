/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../app.d.ts" />

var directorController = (Director: IDirectorModel) => {
	var get = () => {
		return Director.listAll()
	};
	
	return {
		get
	};
};

module.exports = directorController;

