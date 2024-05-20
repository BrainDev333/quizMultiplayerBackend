import { Schema, Types, model } from 'mongoose'
import {
  defaultSchemaOptions,
  modelOptions,
} from '../constants/database.constants'

enum PerkType {
  ASK_PUBLIC = 'ask_public',
  ASK_FRIEND = 'ask_friend',
}

interface Perk {
  type: PerkType
  usageCount: number
}

enum GameSessionStatus {
  WAITING = 'waiting',
  STARTED = 'started',
  ENDED = 'ended',
}

interface IGameSession {
  _id: Types.ObjectId
  currentQuestionIndex: number
  players: {
    sessionId: string
    score: number
    perks: Perk[]
  }[]
  moderator: {
    sessionId: string
  }
  selectedAnswers: {
    playerId: string
    answerIndices: number[]
  }[]
  correctAnswerIndices: number[]
  status: GameSessionStatus
}

const gameSessionSchema = new Schema<IGameSession>(
  {
    currentQuestionIndex: { type: Number, default: 0 },
    players: [
      {
        sessionId: { type: String, required: true },
        score: { type: Number, default: 0 },
        perks: [{ type: Schema.Types.Mixed }],
      },
    ],
    moderator: {
      sessionId: { type: String, required: true },
    },
    selectedAnswers: [
      {
        playerId: { type: String, required: true },
        answerIndices: [{ type: Number, required: true }],
      },
    ],
    correctAnswerIndices: { type: [Number], required: true },
    status: {
      type: String,
      enum: Object.values(GameSessionStatus),
      default: GameSessionStatus.WAITING,
    },
  },
  defaultSchemaOptions
)

const GameSession = model<IGameSession>(
  modelOptions.GAME_SESSION.modelName,
  gameSessionSchema,
  modelOptions.GAME_SESSION.collectionName
)

export { GameSession, IGameSession, GameSessionStatus }
