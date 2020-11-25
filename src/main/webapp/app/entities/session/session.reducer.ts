import axios from 'axios';
import {
  parseHeaderForLinks,
  loadMoreDataWhenScrolled,
  ICrudGetAction,
  ICrudGetAllAction,
  ICrudPutAction,
  ICrudDeleteAction,
} from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ISession, defaultValue } from 'app/shared/model/session.model';

export const ACTION_TYPES = {
  FETCH_SESSION_LIST: 'session/FETCH_SESSION_LIST',
  FETCH_CURRENT_SESSION: 'session/FETCH_CURRENT_SESSION',
  CREATE_SESSION: 'session/CREATE_SESSION',
  CLOSE_SESSION: 'session/CLOSE_SESSION',
  RESET: 'session/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ISession>,
  links: { next: 0 },
  totalItems: 0,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type SessionState = Readonly<typeof initialState>;

// Reducer

export default (state: SessionState = initialState, action): SessionState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_SESSION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CURRENT_SESSION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_SESSION):
    case REQUEST(ACTION_TYPES.CLOSE_SESSION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_SESSION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CURRENT_SESSION):
    case FAILURE(ACTION_TYPES.CREATE_SESSION):
    case FAILURE(ACTION_TYPES.CLOSE_SESSION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_SESSION_LIST): {
      const links = parseHeaderForLinks(action.payload.headers.link);

      return {
        ...state,
        loading: false,
        links,
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links),
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    }
    case SUCCESS(ACTION_TYPES.FETCH_CURRENT_SESSION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case ACTION_TYPES.CREATE_SESSION:
    case SUCCESS(ACTION_TYPES.CREATE_SESSION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CLOSE_SESSION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: defaultValue,
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/sessions';

// Actions

export const getCurrentSession: ICrudGetAction<ISession> = () => {
  const requestUrl = `${apiUrl}/current`;
  return {
    type: ACTION_TYPES.FETCH_CURRENT_SESSION,
    payload: axios.get<ISession>(requestUrl),
  };
};

export const getEntities: ICrudGetAllAction<ISession> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_SESSION_LIST,
    payload: axios.get<ISession>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const createEntity: ICrudPutAction<ISession> = entity => async dispatch => {
  dispatch({
    type: ACTION_TYPES.CREATE_SESSION,
    payload: { data: cleanEntity(entity) },
  });
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_SESSION,
    payload: axios.post(apiUrl, cleanEntity(entity)),
    meta: {
      ignoreError: true,
    },
  });
  return result;
};

export const closeEntity: ICrudPutAction<ISession> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CLOSE_SESSION,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
