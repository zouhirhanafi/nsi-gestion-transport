import axios from 'axios';
import { translate, Storage } from 'react-jhipster';

import { SERVER_API_URL } from 'app/config/constants';
import { networkStatusChanged } from './detectNetwork';

const TIMEOUT = 1 * 60 * 1000;
axios.defaults.timeout = TIMEOUT;
axios.defaults.baseURL = SERVER_API_URL;

const setupAxiosInterceptors = (onUnauthenticated, store) => {
  const onRequestSuccess = config => {
    const token = Storage.local.get('jhi-authenticationToken') || Storage.session.get('jhi-authenticationToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  };
  const onResponseSuccess = response => {
    const {
      network: { online },
    } = store.getState();
    if (!online) {
      store.dispatch(networkStatusChanged(true));
    }
    return response;
  };
  const onResponseError = err => {
    const status = err.status || (err.response ? err.response.status : 0);
    if (status === 403 || status === 401) {
      onUnauthenticated();
    }
    if (err.message && err.message.indexOf('Network Error') !== -1) {
      const {
        network: { online },
      } = store.getState();
      if (online) {
        store.dispatch(networkStatusChanged(false));
      }
      return Promise.reject({ status: 599, message: translate('global.network.offline') });
    }
    return Promise.reject(err);
  };
  axios.interceptors.request.use(onRequestSuccess);
  axios.interceptors.response.use(onResponseSuccess, onResponseError);
};

export default setupAxiosInterceptors;
