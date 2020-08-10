import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import configStore from "./redux/store";
import App from "./App";
import { newGame } from "./redux/actions/actions";


// At a later point, we can pull the state stored in local storage (or another source)
// and use it to create the store from a previous state.

const initState = null;
const store = configStore(initState || {});
if (!initState) {
  store.dispatch(newGame());
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
