import BaseError from './base.error';

export default class NotFoundError extends BaseError {
  constructor({ error, message }) {
    super(404, error || 'NOT_FOUND', message || 'not found');
  }
}
