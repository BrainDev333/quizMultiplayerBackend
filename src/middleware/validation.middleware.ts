import { NextFunction, Request, Response } from 'express';
import { RequestValidationSchemas } from '../validations';
import BadRequestError from '../errors/bad-request.error';

// TODO: maybe add validBody
const validate = (schemas: RequestValidationSchemas) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      if (schemas.body) await schemas.body.validateAsync(req.body);
      if (schemas.params) await schemas.params.validateAsync(req.params);
      if (schemas.query) await schemas.query.validateAsync(req.query);
      next();
    } catch (error) {
      return next(
        new BadRequestError({
          error: 'BAD_REQUEST_ERROR', // TODO:
          message: error.message,
        }),
      );
    }
  };
};

export default validate;
