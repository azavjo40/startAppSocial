import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { applyMiddleware, compose, createStore } from "redux";
import { roodReducer } from "./redux/roodReducer";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

const store = createStore(
  roodReducer,
  compose(
    applyMiddleware(
      // добавить свой мидолверий thunk для асинхроний и свой Middleware spamWords
      thunk
    ),
    // обединения стор и Redux DevTools
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);
ReactDOM.render(app, document.getElementById("root"));
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
