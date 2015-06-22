interface IModel {
	listAll?: (cb: (err, result: any[]) => void) => void;
	get?: (id: number, cb: (err, result) => void) => void;
	set?: (id: number, val, cb: (err, result) => void) => void;
	remove?: (id: number, cb: (err, result) => void) => void;
}
