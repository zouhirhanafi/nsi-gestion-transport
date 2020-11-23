import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IConducteur, defaultValue } from 'app/shared/model/conducteur.model';

export const ACTION_TYPES = {
  FETCH_CONDUCTEUR_LIST: 'conducteur/FETCH_CONDUCTEUR_LIST',
  FETCH_CONDUCTEUR: 'conducteur/FETCH_CONDUCTEUR',
  CREATE_CONDUCTEUR: 'conducteur/CREATE_CONDUCTEUR',
  UPDATE_CONDUCTEUR: 'conducteur/UPDATE_CONDUCTEUR',
  DELETE_CONDUCTEUR: 'conducteur/DELETE_CONDUCTEUR',
  RESET: 'conducteur/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IConducteur>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type ConducteurState = Readonly<typeof initialState>;

// Reducer

export default (state: ConducteurState = initialState, action): ConducteurState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CONDUCTEUR_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CONDUCTEUR):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_CONDUCTEUR):
    case REQUEST(ACTION_TYPES.UPDATE_CONDUCTEUR):
    case REQUEST(ACTION_TYPES.DELETE_CONDUCTEUR):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_CONDUCTEUR_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CONDUCTEUR):
    case FAILURE(ACTION_TYPES.CREATE_CONDUCTEUR):
    case FAILURE(ACTION_TYPES.UPDATE_CONDUCTEUR):
    case FAILURE(ACTION_TYPES.DELETE_CONDUCTEUR):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_CONDUCTEUR_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_CONDUCTEUR):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_CONDUCTEUR):
    case SUCCESS(ACTION_TYPES.UPDATE_CONDUCTEUR):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_CONDUCTEUR):
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

const apiUrl = 'api/conducteurs';

// Actions

export const getEntities: ICrudGetAllAction<IConducteur> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_CONDUCTEUR_LIST,
    payload: axios.get<IConducteur>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IConducteur> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CONDUCTEUR,
    payload: axios.get<IConducteur>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IConducteur> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CONDUCTEUR,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IConducteur> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CONDUCTEUR,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IConducteur> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CONDUCTEUR,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
