import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

// Root Reducer
import RootReducer from "./root-reducer";

const configStore = (state = {}) => {
  const middlewares = [thunk];
  const store = createStore(
    RootReducer,
    state,
    applyMiddleware(...middlewares)
  );
  return store;
};

export default configStore;
