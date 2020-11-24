import axios from 'axios';
import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { createOffline } from '@redux-offline/redux-offline';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults/index';

import reducer, { IRootState } from 'app/shared/reducers';
import DevTools from './devtools';
import errorMiddleware from './error-middleware';
import notificationMiddleware from './notification-middleware';
import loggerMiddleware from './logger-middleware';
import websocketMiddleware from './websocket-middleware';
import { loadingBarMiddleware } from 'react-redux-loading-bar';
import localforage from 'localforage';

localforage.setDriver([localforage.INDEXEDDB, localforage.WEBSQL, localforage.LOCALSTORAGE]);
const storage = localforage;

const persistConfig = {
  key: 'n_s_i_20',
  storage,
};

const effect = (eff, _action) => axios(eff);
const discard = (error, _action, _retries) => {
  const { request, response } = error;
  if (!request) throw error; // There was an error creating the request
  if (!response) return false; // There was no response
  return 400 <= response.status && response.status < 500;
};

const { middleware: offlineMiddleware, enhanceReducer: offlineEnhanceReducer, enhanceStore: offlineEnhanceStore } = createOffline({
  ...offlineConfig,
  persist: false,
  effect,
  discard,
});

const persistedReducer = persistReducer(persistConfig, offlineEnhanceReducer(reducer));

const defaultMiddlewares = [
  thunkMiddleware,
  offlineMiddleware,
  errorMiddleware,
  notificationMiddleware,
  promiseMiddleware,
  loadingBarMiddleware(),
  websocketMiddleware,
  loggerMiddleware,
];
const composedMiddlewares = middlewares =>
  process.env.NODE_ENV === 'development'
    ? compose(applyMiddleware(...defaultMiddlewares, ...middlewares), offlineEnhanceStore, DevTools.instrument())
    : compose(applyMiddleware(...defaultMiddlewares, ...middlewares), offlineEnhanceStore);

export default (initialState?: IRootState, middlewares = []) => {
  // const store = createStore(
  //   persistedReducer,
  //   composeWithDevTools(
  //     offlineEnhanceStore,
  //     applyMiddleware(thunk, offlineMiddleware)
  //   )
  // );
  const store = createStore(persistedReducer, initialState, composedMiddlewares(middlewares));
  const persistor = persistStore(store);
  return { store, persistor };
};
