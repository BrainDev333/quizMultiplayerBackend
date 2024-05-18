import BaseError from './base.error';

export default class InternalServerError extends BaseError {
  constructor({ error, message }) {
    super(
      500,
      error || 'INTERNAL_SERVER_ERROR',
      message || 'internal server error',
    );
  }
}
