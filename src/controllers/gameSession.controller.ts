import { Request, Response } from 'express'
import GameSessionService from '../services/gameSession.service'
import { GameSession, GameSessionStatus } from '../models/gameSession.model'

const gameSessionService = new GameSessionService()

async function createGameSession(req: Request, res: Response) {
  const { quizId } = req.params
  const { playersSessionIds, moderatorSessionId } = req.body

  //  if (!sessionIds.includes(req.sessionId)) {
  //    return res.status(403).json({ message: 'Unauthorized' });
  //  }
  // const moderatorSessionId = req.session.id; // TODO:

  // const playersSessionIds = sessionIds.filter(
  //   (sessionId) => sessionId !== moderatorSessionId,
  // );

  const gameSession = await gameSessionService.createGameSession(
    quizId,
    moderatorSessionId,
    playersSessionIds
  )
  res.status(201).json({ gameSession })
}

async function checkGameSessionStatus(_req: Request, res: Response) {
  try {
    // Check if the game session has started (you might need to adjust the condition based on your game logic)
    const gameSessionStarted = await GameSession.exists({
      status: GameSessionStatus.STARTED,
    })
    res.json({ gameSessionStarted })
  } catch (error) {
    console.error('Error checking game session status:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// TODO:
async function updatePlayerScore(req: Request, res: Response): Promise<void> {
  const { playerSessionId, gameSessionId } = req.body
  const updatedGameSession =
    await new GameSessionService().incrementPlayerScore(
      playerSessionId,
      gameSessionId
    )
  res.json({ gameSession: updatedGameSession })
}

async function getPlayerData(req: Request, res: Response): Promise<void> {
  const { gameSessionId, playerSessionId } = req.params

  const player = await new GameSessionService().getPlayerData(
    gameSessionId,
    playerSessionId
  )
  res.json({ player })
}

async function getGameSession(req: Request, res: Response): Promise<void> {
  const { gameSessionId } = req.params

  const gameSession = await new GameSessionService().findGameSession(
    gameSessionId
  )
  res.json({ gameSession })
}

export {
  createGameSession,
  checkGameSessionStatus,
  updatePlayerScore,
  getPlayerData,
  getGameSession,
}
