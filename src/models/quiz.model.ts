import { Schema, Types, model } from 'mongoose';
import {
  defaultSchemaOptions,
  modelOptions,
} from '../constants/database.constants';

interface IQuiz {
  _id: Types.ObjectId;
  name: string;
  questions: {
    questionText: string;
    possibleAnswers: string[];
    correctAnswerIndices: number[];
    _id: string;
  }[];
}

const quizSchema = new Schema<IQuiz>(
  {
    name: { type: String, required: true },
    questions: [
      {
        questionText: { type: String, required: true },
        possibleAnswers: { type: [String], required: true },
        correctAnswerIndices: [{ type: Number, required: true }],
      },
    ],
  },
  defaultSchemaOptions,
);

const Quiz = model<IQuiz>(
  modelOptions.QUIZ.modelName,
  quizSchema,
  modelOptions.QUIZ.collectionName,
);

export { Quiz, IQuiz };
