import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IParameter, defaultValue } from 'app/shared/model/parameter.model';

export const ACTION_TYPES = {
  FETCH_PARAMETER_LIST: 'parameter/FETCH_PARAMETER_LIST',
  FETCH_PARAMETER: 'parameter/FETCH_PARAMETER',
  CREATE_PARAMETER: 'parameter/CREATE_PARAMETER',
  UPDATE_PARAMETER: 'parameter/UPDATE_PARAMETER',
  DELETE_PARAMETER: 'parameter/DELETE_PARAMETER',
  RESET: 'parameter/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IParameter>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type ParameterState = Readonly<typeof initialState>;

// Reducer

export default (state: ParameterState = initialState, action): ParameterState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PARAMETER_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PARAMETER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_PARAMETER):
    case REQUEST(ACTION_TYPES.UPDATE_PARAMETER):
    case REQUEST(ACTION_TYPES.DELETE_PARAMETER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_PARAMETER_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PARAMETER):
    case FAILURE(ACTION_TYPES.CREATE_PARAMETER):
    case FAILURE(ACTION_TYPES.UPDATE_PARAMETER):
    case FAILURE(ACTION_TYPES.DELETE_PARAMETER):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PARAMETER_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_PARAMETER):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_PARAMETER):
    case SUCCESS(ACTION_TYPES.UPDATE_PARAMETER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_PARAMETER):
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

const apiUrl = 'api/parameters';

// Actions

export const getEntities: ICrudGetAllAction<IParameter> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_PARAMETER_LIST,
    payload: axios.get<IParameter>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IParameter> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PARAMETER,
    payload: axios.get<IParameter>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IParameter> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PARAMETER,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IParameter> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PARAMETER,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IParameter> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PARAMETER,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
