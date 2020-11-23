import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IEngin, defaultValue } from 'app/shared/model/engin.model';

export const ACTION_TYPES = {
  FETCH_ENGIN_LIST: 'engin/FETCH_ENGIN_LIST',
  FETCH_ENGIN: 'engin/FETCH_ENGIN',
  CREATE_ENGIN: 'engin/CREATE_ENGIN',
  UPDATE_ENGIN: 'engin/UPDATE_ENGIN',
  DELETE_ENGIN: 'engin/DELETE_ENGIN',
  RESET: 'engin/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IEngin>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type EnginState = Readonly<typeof initialState>;

// Reducer

export default (state: EnginState = initialState, action): EnginState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ENGIN_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ENGIN):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_ENGIN):
    case REQUEST(ACTION_TYPES.UPDATE_ENGIN):
    case REQUEST(ACTION_TYPES.DELETE_ENGIN):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_ENGIN_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ENGIN):
    case FAILURE(ACTION_TYPES.CREATE_ENGIN):
    case FAILURE(ACTION_TYPES.UPDATE_ENGIN):
    case FAILURE(ACTION_TYPES.DELETE_ENGIN):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_ENGIN_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_ENGIN):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_ENGIN):
    case SUCCESS(ACTION_TYPES.UPDATE_ENGIN):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_ENGIN):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/engins';

// Actions

export const getEntities: ICrudGetAllAction<IEngin> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_ENGIN_LIST,
    payload: axios.get<IEngin>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IEngin> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ENGIN,
    payload: axios.get<IEngin>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IEngin> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ENGIN,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IEngin> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ENGIN,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IEngin> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ENGIN,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
