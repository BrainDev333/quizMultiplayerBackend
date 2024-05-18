import { GAME_SESSION_ERRORS } from '../constants/errorMessages.constants';
import NotFoundError from '../errors/not-found.error';
import { GameSession, IGameSession } from '../models/gameSession.model';
import { Quiz } from '../models/quiz.model';

export default class GameSessionService {
  async createGameSession(
    quizId: string,
    moderatorSessionId: string,
    playersSessionIds: string[],
  ): Promise<IGameSession> {
    const quiz = await Quiz.findById(quizId);
    if (!quiz) throw new NotFoundError(GAME_SESSION_ERRORS.NOT_FOUND);

    const players = playersSessionIds.map((sessionId) => ({
      sessionId,
      score: 0,
      perks: [], // FIXME:
    }));

    const gameSession = await GameSession.create({
      quizId,
      players,
      moderator: { sessionId: moderatorSessionId },
      currentQuestionIndex: 0,
      selectedAnswers: [],
      correctAnswerIndices: [],
    });

    return gameSession;
  }

  // async submitAnswer(
  //   gameSessionId: string,
  //   playerId: string,
  //   selectedAnswers: number[],
  // ): Promise<IGameSession> {
  //   try {
  //     // Find the game session by ID
  //     const gameSession = await GameSession.findById(gameSessionId);
  //     if (!gameSession) {
  //       throw new Error('Game session not found');
  //     }

  //     // Find the player's selected answer(s) in the game session's selectedAnswers array
  //     const playerAnswersIndex = gameSession.selectedAnswers.findIndex(
  //       (entry) => entry.playerId.toString() === playerId,
  //     );

  //     // If player's selected answers are found, update them; otherwise, create a new entry
  //     if (playerAnswersIndex !== -1) {
  //       gameSession.selectedAnswers[playerAnswersIndex].answerIndices =
  //         selectedAnswers;
  //     } else {
  //       gameSession.selectedAnswers.push({
  //         playerId: Types.ObjectId(playerId),
  //         answerIndices: selectedAnswers,
  //       });
  //     }

  //     // Perform any additional logic related to scoring or timers here

  //     // Save the updated game session
  //     await gameSession.save();

  //     return gameSession;
  //   } catch (error) {
  //     throw new Error('Error submitting answer');
  //   }
  // }
}
