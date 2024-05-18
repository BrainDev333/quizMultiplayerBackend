import { SchemaOptions } from 'mongoose';

export const modelOptions = {
  USER: { modelName: 'User', collectionName: 'users' },
  QUIZ: { modelName: 'Quiz', collectionName: 'quizzes' },
  GAME_SESSION: { modelName: 'GameSession', collectionName: 'game_sessions' },
};

export const defaultSchemaOptions: SchemaOptions<never> = {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
};
