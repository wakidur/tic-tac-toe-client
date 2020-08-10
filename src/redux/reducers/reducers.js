import {
  NEW_GAME,
  GAMEOVER,
  MOVE,
  PLAYER,
  WINNER,
  CREATE_ACTION_LOG,
  FETCH_ACTION_LOGS,
} from "../actions/types";

const emptyBoard = () => [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

export const move = (board, { player, row, col }) => {
  const updated = board.slice();

  updated[row][col] = player;

  return updated;
};

export const boardReducer = (state = [[]], { type, payload }) => {
  switch (type) {
    case NEW_GAME:
      return emptyBoard();
    case MOVE:
      return move(state, payload);
    default:
      return state;
  }
};

export const gameoverReducer = (state = false, { type, payload }) => {
  switch (type) {
    case NEW_GAME:
      return false;
    case GAMEOVER:
      return true;
    case WINNER:
      return true;
    default:
      return state;
  }
};

export const winnerReducer = (state = -1, { type, payload }) => {
  switch (type) {
    case WINNER:
      return payload;
    case NEW_GAME:
      return -1;
    default:
      return state;
  }
};

export const playerReducer = (state = 1, { type, payload }) => {
  switch (type) {
    case PLAYER:
      return payload;
    case NEW_GAME:
      return 1;
    default:
      return state;
  }
};

const initialStatecreateActionLog = {};

export const createActionLogReducer = (
  state = initialStatecreateActionLog,
  { type, payload }
) => {
  switch (type) {
    case CREATE_ACTION_LOG:
      return { ...state, ...payload };

    default:
      return state;
  }
};

export const fetchActionLogsReducer = (state = [], { type, payload }) => {
  switch (type) {
    case FETCH_ACTION_LOGS:
      return [...state, ...payload];

    default:
      return state;
  }
};
