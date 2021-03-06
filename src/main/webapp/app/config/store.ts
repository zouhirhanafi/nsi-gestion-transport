import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

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

const defaultMiddlewares = [
  thunkMiddleware,
  errorMiddleware,
  notificationMiddleware,
  promiseMiddleware,
  loadingBarMiddleware(),
  websocketMiddleware,
  loggerMiddleware,
];
const composedMiddlewares = middlewares =>
  process.env.NODE_ENV === 'development'
    ? compose(applyMiddleware(...defaultMiddlewares, ...middlewares), DevTools.instrument())
    : compose(applyMiddleware(...defaultMiddlewares, ...middlewares));

const persistConfig = {
  key: 'sosomalev-_2',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

export default (initialState?: IRootState, middlewares = []) => {
  const store = createStore(persistedReducer, initialState, composedMiddlewares(middlewares));
  const persistor = persistStore(store);
  return { store, persistor };
};
