interface IModel {
	listAll?: (callback: (err, result: any[]) => void) => void;
	get?: (id: string, cb: (err, result) => void) => void;
	set?: (id: string, val, cb: (err, result) => void) => void;
	remove?: (id: string, cb: (err, result) => void) => void;
}
