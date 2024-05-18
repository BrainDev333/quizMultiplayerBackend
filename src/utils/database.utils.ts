import mongoose from 'mongoose';
import { DATABASE } from '../configs/app.config';
// import { logger } from './logger.utils';

export function connectToDatabase() {
  const connectionString = DATABASE.CONNECTION_STRING;
  if (!connectionString)
    throw new Error(
      'connectToDatabase => DATABASE_CONNECTION_STRING is undefined',
    );

  return mongoose
    .connect(connectionString)
    .then(() => console.log('Connected to database'))
    .catch((error) => {
      console.error('connectToDatabase Error =>', error);
    });
}
