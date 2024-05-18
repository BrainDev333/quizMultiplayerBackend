import Joi from 'joi';
import { isMongoIdJoi } from '../utils/joi.utils';

export const createGameSessionSchema = {
  params: Joi.object().keys({
    quizId: Joi.string().required().custom(isMongoIdJoi),
  }),
  body: Joi.object().keys({
    moderatorSessionId: Joi.string().required(),
    playersSessionIds: Joi.array()
      .items(Joi.string().required())
      .min(2)
      .required(),
  }),
};
