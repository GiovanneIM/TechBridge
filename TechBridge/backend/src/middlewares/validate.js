import { ZodError } from 'zod';

export const validateZod =
	(schema, source = 'body') =>
		(req, res, next) => {
			try {
				req[source] = schema.parse(req[source]);
				next();
			} catch (err) {
				if (err instanceof ZodError) {
					return next(err);
				}
				next(err);
			}
		};