const handle = (callback, online) => {
  // NetInfo is not supported in browsers, hence we only pass online status
  if (window.requestAnimationFrame) {
    window.requestAnimationFrame(() => callback({ online }));
  } else {
    setTimeout(() => callback({ online }), 0);
  }
};

export const detectNetwork = callback => {
  if (typeof window !== 'undefined' && window.addEventListener) {
    window.addEventListener('online', () => handle(callback, true));
    window.addEventListener('offline', () => handle(callback, false));
    handle(callback, window.navigator.onLine);
  }
};

export const OFFLINE_STATUS_CHANGED: 'Offline/STATUS_CHANGED' = 'Offline/STATUS_CHANGED';

export const networkStatusChanged = params => {
  let payload;
  if (typeof params === 'object') {
    payload = params;
  } else {
    payload = { online: params };
  }
  return {
    type: OFFLINE_STATUS_CHANGED,
    payload,
  };
};

const initialState = { online: true };
export type NetworkState = Readonly<typeof initialState>;
// Updates an entity cache in response to any action with payload.entities.
export const networkReducer = (state: NetworkState = initialState, action): NetworkState => {
  if (action.type === OFFLINE_STATUS_CHANGED) {
    return {
      online: action.payload.online,
    };
  }
  return state;
};

export const selectNetwork = state => state.network.online;

export default store => {
  detectNetwork(online => {
    store.dispatch(networkStatusChanged(online));
  });
};
