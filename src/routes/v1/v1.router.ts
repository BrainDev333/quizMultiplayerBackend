import express from 'express';
import { quizRoutes } from './quiz.routes';
import { gameSessionRoutes } from './gameSession.routes';

const router = express.Router();

router.use('/quizzes', quizRoutes);
router.use('/game-sessions', gameSessionRoutes);

export { router as v1Router };
