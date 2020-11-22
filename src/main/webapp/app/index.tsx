import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PersistGate } from 'redux-persist/integration/react'

import DevTools from './config/devtools';
import initStore from './config/store';
import { registerLocale } from './config/translation';
import setupAxiosInterceptors from './config/axios-interceptor';
import { clearAuthentication } from './shared/reducers/authentication';
import ErrorBoundary from './shared/error/error-boundary';
import AppComponent from './app';
import { loadIcons } from './config/icon-loader';
import { loadEntities } from './entities/parameter/params.reducer';

const devTools = process.env.NODE_ENV === 'development' ? <DevTools /> : null;

const { store, persistor } = initStore();
registerLocale(store);

const actions = bindActionCreators({ clearAuthentication, loadEntities }, store.dispatch);
setupAxiosInterceptors(() => actions.clearAuthentication('login.error.unauthorized'));
actions.loadEntities();

loadIcons();

const rootEl = document.getElementById('root');

const render = Component =>
  // eslint-disable-next-line react/no-render-return-value
  ReactDOM.render(
    <ErrorBoundary>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <div>
            {/* If this slows down the app in dev disable it and enable when required  */}
            {devTools}
            <Component />
          </div>
        </PersistGate>
      </Provider>
    </ErrorBoundary>,
    rootEl
  );

render(AppComponent);
