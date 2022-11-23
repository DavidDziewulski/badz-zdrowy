import { NextFunction, Response, Request } from 'express';
import { validationResult } from 'express-validator';

export const useMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const error = validationResult(req);

	if (!error.isEmpty()) {
		return res.json(error);
	}

	next();
}