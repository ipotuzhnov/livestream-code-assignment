interface IModel {
	listAll?: (callback: (err, results: string[]) => void) => void;
	get?: (id: string, cb: (err, res: string) => void) => void;
	set?: (id: string, val, cb: (err, res: string) => void) => void;
}
