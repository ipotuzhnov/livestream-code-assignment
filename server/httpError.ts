/// <reference path="./_all.d.ts" />

var createHttpError = (code: number, message: string) => {
	var error = new Error(message);
	error.status = code;
	return error;
};

export = createHttpError;
