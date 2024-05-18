import express from 'express';
import { createQuiz, getQuizById } from '../../controllers/quiz.controller';
import { asyncMiddleware } from '../../middleware/async.middleware';
import validate from '../../middleware/validation.middleware';
import {
  createQuizSchema,
  getQuizByIdSchema,
} from '../../validations/quiz.validations';

const router = express.Router();

router.post('/', validate(createQuizSchema), asyncMiddleware(createQuiz));

router.get(
  '/:quizId',
  validate(getQuizByIdSchema),
  asyncMiddleware(getQuizById),
);

export { router as quizRoutes };
