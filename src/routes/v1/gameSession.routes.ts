import express from 'express'
import {
  checkGameSessionStatus,
  createGameSession,
  getGameSession,
  getPlayerData,
  updatePlayerScore,
} from '../../controllers/gameSession.controller'
import validate from '../../middleware/validation.middleware'
import { createGameSessionSchema } from '../../validations/gameSession.validations'
import { asyncMiddleware } from '../../middleware/async.middleware'

const router = express.Router()

router.post(
  '/:quizId',
  validate(createGameSessionSchema),
  asyncMiddleware(createGameSession)
)

router.get('/game-sessions/status', asyncMiddleware(checkGameSessionStatus))

router.put('/:gameSessionId/score', asyncMiddleware(updatePlayerScore))

router.get(
  '/:gameSessionId/player/:playerSessionId',
  asyncMiddleware(getPlayerData)
)

router.get('/:gameSessionId', asyncMiddleware(getGameSession))

export { router as gameSessionRoutes }
