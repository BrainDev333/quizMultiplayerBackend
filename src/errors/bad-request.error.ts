import BaseError from './base.error';
export default class BadRequestError extends BaseError {
  constructor({ error, message }) {
    super(400, error || 'BAD_REQUEST', message || 'bad request');
  }
}
