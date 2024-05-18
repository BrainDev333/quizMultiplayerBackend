import { Schema, Types, model } from 'mongoose';
import {
  defaultSchemaOptions,
  modelOptions,
} from '../constants/database.constants';

interface IUser {
  _id: Types.ObjectId;
  username: string;
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true },
  },
  defaultSchemaOptions,
);

const User = model<IUser>(
  modelOptions.USER.modelName,
  userSchema,
  modelOptions.USER.collectionName,
);

export { User, IUser };
