import { Request, Response } from 'express'
import QuizService from '../services/quiz.service'

async function createQuiz(req: Request, res: Response): Promise<void> {
  const quizData = req.body
  const quiz = await new QuizService().createQuiz(quizData)
  res.status(201).json({ quiz }) // TODO: na7i el -v
}

async function getQuizById(req: Request, res: Response): Promise<void> {
  const { quizId } = req.params
  const quiz = await new QuizService().findQuizById(quizId)
  res.json({ quiz })
}

export { getQuizById, createQuiz }
