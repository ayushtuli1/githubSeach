import "babel-polyfill";
import "react-hot-loader/patch";

import { applyMiddleware, createStore } from "redux";

import App from "./App/Appcontainer";
import { AppContainer } from "react-hot-loader";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import createHistory from "history/createBrowserHistory";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./App/app.root.reducer";
import rootSaga from "./App/app.root.saga";
import { routerMiddleware } from "react-router-redux";

const history = createHistory();
const historyMiddleware = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware, historyMiddleware)
);
let sagaTask = sagaMiddleware.run(function*() {
  yield rootSaga();
});

ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
      <App />
    </Provider>
  </AppContainer>,
  document.getElementById("root")
);
if (module.hot) {
  module.hot.accept(rootReducer, () => {
    store.replaceReducer(rootReducer);
  });
  module.hot.accept(rootSaga, () => {
    const getNewSagas = rootSaga;
    sagaTask.cancel();
    sagaTask.done.then(() => {
      sagaTask = sagaMiddleware.run(function*() {
        yield getNewSagas();
      });
    });
  });
  module.hot.accept(App, () => {
    const NextApp = App;
    ReactDOM.render(
      <AppContainer>
        <Provider store={store}>
          <NextApp />
        </Provider>
      </AppContainer>,
      document.getElementById("root")
    );
  });
}
