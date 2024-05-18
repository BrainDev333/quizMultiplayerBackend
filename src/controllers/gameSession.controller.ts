import { Request, Response } from 'express';
import GameSessionService from '../services/gameSession.service';
import { GameSession, GameSessionStatus } from '../models/gameSession.model';

const gameSessionService = new GameSessionService();

async function createGameSession(req: Request, res: Response) {
  const { quizId } = req.params;
  const { playersSessionIds, moderatorSessionId } = req.body;
  console.log('moderatorSessionID = ', moderatorSessionId);
  console.log('playersSessionIds = ', playersSessionIds);

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
    playersSessionIds,
  );
  res.status(201).json({ gameSession });
}

async function checkGameSessionStatus(_req: Request, res: Response) {
  try {
    // Check if the game session has started (you might need to adjust the condition based on your game logic)
    const gameSessionStarted = await GameSession.exists({
      status: GameSessionStatus.STARTED,
    });
    res.json({ gameSessionStarted });
  } catch (error) {
    console.error('Error checking game session status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export { createGameSession, checkGameSessionStatus };
