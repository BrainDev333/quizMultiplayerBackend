import Joi from 'joi';
import { isMongoIdJoi } from '../utils/joi.utils';

export const createQuizSchema = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    questions: Joi.array().items({
      questionText: Joi.string().required(),
      possibleAnswers: Joi.array().items(Joi.string()).required().min(1),
    }),
    correctAnswerIndices: Joi.array().items(Joi.number()).required().min(1),
  }),
};

export const getQuizByIdSchema = {
  params: Joi.object().keys({
    quizId: Joi.custom(isMongoIdJoi).required(),
  }),
};
