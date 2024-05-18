const ERRORS = {
  SERVER_ERRROS: {
    INTERNAL_SERVER_ERROR: {
      error: 'INTERNAL_SERVER_ERROR',
      message: 'internal server error',
    },
  },
  QUIZ_ERRORS: {
    NOT_FOUND: { error: 'QUIZ_NOT_FOUND', message: 'Quiz not found' },
  },
  GAME_SESSION_ERRORS: {
    NOT_FOUND: {
      error: 'GAME_SESSION_NOT_FOUND',
      message: 'Game session not found',
    },
  },
};

export const { QUIZ_ERRORS, GAME_SESSION_ERRORS, SERVER_ERRROS } = ERRORS;
