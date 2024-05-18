import { NextFunction, Request, Response } from 'express';
import BaseError from '../errors/base.error';
import { SERVER_ERRROS } from '../constants/errorMessages.constants';

export default function errorHandler(
  err: Error,
  _req: Request, // TODO: remove underscore
  res: Response,
  next: NextFunction,
) {
  if (err instanceof BaseError && err.status !== 500)
    res.status(err.status).json(err.toJson());
  else res.status(500).json(SERVER_ERRROS.INTERNAL_SERVER_ERROR);

  // TODO: Log errors

  next();
}
