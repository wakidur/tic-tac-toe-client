import { combineReducers } from "redux";

import {
  boardReducer,
  gameoverReducer,
  winnerReducer,
  playerReducer,
  createActionLogReducer,
  fetchActionLogsReducer
} from "./reducers/reducers";

export default combineReducers({
  createLog: createActionLogReducer,
  fetchLogs: fetchActionLogsReducer,
  board: boardReducer,
  gameover: gameoverReducer,
  winner: winnerReducer,
  player: playerReducer,
  
});
