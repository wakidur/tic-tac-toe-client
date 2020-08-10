import {
  NEW_GAME,
  GAMEOVER,
  MOVE,
  PLAYER,
  WINNER,
  CREATE_ACTION_LOG,
  FETCH_ACTION_LOGS,
} from "./types";
import { isDraw, isWinner } from "../utils/game-utils";
import ActionLogApi from "../apis/actions-log";

const gameover = () => ({
  type: GAMEOVER,
});

const movePlayer = (player, row, col) => ({
  type: MOVE,
  payload: { player, row, col },
});

const switchPlayer = (player) => ({
  type: PLAYER,
  payload: player,
});

const winner = (player) => ({
  type: WINNER,
  payload: player,
});

export const newGame = () => ({
  type: NEW_GAME,
});

export const checkWinner = (board, player) => (dispatch) => {
  let hasWinner = true;

  if (isWinner(board, player)) {
    dispatch(winner(player));
    dispatch(gameover());
  } else if (isDraw(board)) {
    dispatch(winner(0));
    dispatch(gameover());
  } else {
    hasWinner = false;
  }

  return hasWinner;
};

export const playTurn = (player, row, col) => (dispatch) => {
  let nextPlayer;

  switch (player) {
    case 1:
      nextPlayer = 2;
      break;
    case 2:
      nextPlayer = 1;
      break;
    default:
      // throw error?
      break;
  }

  dispatch(movePlayer(player, row, col));
  dispatch(switchPlayer(nextPlayer));
};

export const createActionLog = (formValues) => async (dispatch, getState) => {
  const response = await ActionLogApi.post("/actionlogs", { ...formValues });
  
  dispatch({
    type: CREATE_ACTION_LOG,
    payload: response.data,
  });
};

export const fetchActionLogs = () => async (dispatch) => {
  const response = await ActionLogApi.get("/actionlogs");
  dispatch({
    type: FETCH_ACTION_LOGS,
    payload: response.data,
  });
};
