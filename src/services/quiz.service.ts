import { QUIZ_ERRORS } from '../constants/errorMessages.constants';
import NotFoundError from '../errors/not-found.error';
import { Quiz, IQuiz } from '../models/quiz.model';

export default class QuizService {
  async createQuiz(data: Partial<IQuiz>): Promise<IQuiz> {
    const quiz = await Quiz.create(data);
    return quiz;
  }

  async findQuizById(quizId: string): Promise<IQuiz | null> {
    const quiz = await Quiz.findById(quizId);
    if (!quiz) throw new NotFoundError(QUIZ_ERRORS.NOT_FOUND);
    return quiz;
  }
}
