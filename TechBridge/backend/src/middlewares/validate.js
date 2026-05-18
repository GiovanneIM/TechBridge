import { log } from 'console';
import { ZodError } from 'zod';
import { da } from 'zod/v4/locales';

// export const validateZod =
// 	(schema, source = 'body') =>
// 		(req, res, next) => {
// 			try {
// 				req[source] = schema.parse(req[source]);
// 				next();
// 			} catch (err) {
// 				if (err instanceof ZodError) {
// 					return next(err);
// 				}
// 				next(err);
// 			}
// 		};

export const validateZod =
	(schema, source = 'body') =>
		(req, res, next) => {
			try {
				const data = schema.parse(req[source]);

				req.validated = req.validated || {};
				req.validated[source] = data;

				next();
			} catch (err) {
				if (err instanceof ZodError) {
					const errosFormatados = formatarErrosZod(err.issues);

					return res.status(400).json({
						sucesso: false,
						erros_zod: errosFormatados
					});
				}

				next(err);
			}
		};

function formatarErrosZod(errors) {
	const formatted = {};

	errors.forEach((err) => {
		const path = err.path.join('.');
		formatted[path] = err.message;
	});

	return formatted;
}