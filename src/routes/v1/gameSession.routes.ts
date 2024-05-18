import express from 'express';
import {
  checkGameSessionStatus,
  createGameSession,
} from '../../controllers/gameSession.controller';
import validate from '../../middleware/validation.middleware';
import { createGameSessionSchema } from '../../validations/gameSession.validations';
import { asyncMiddleware } from '../../middleware/async.middleware';

const router = express.Router();

router.post(
  '/:quizId',
  validate(createGameSessionSchema),
  asyncMiddleware(createGameSession),
);

router.get('/game-sessions/status', asyncMiddleware(checkGameSessionStatus));

export { router as gameSessionRoutes };
