import { CustomHelpers, LanguageMessages } from 'joi';
import { isValidObjectId } from 'mongoose';

export const isMongoIdJoi = (id: string, helpers: CustomHelpers) => {
  if (!isValidObjectId(id)) {
    const property = helpers?.state?.path;
    const errorMessage =
      `${property} is invalid` as unknown as LanguageMessages;

    return helpers.message(errorMessage);
  }
  return helpers.original;
};
