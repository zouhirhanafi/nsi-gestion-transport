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

import { IAffectation, defaultValue } from 'app/shared/model/affectation.model';

export const ACTION_TYPES = {
  FETCH_AFFECTATION_LIST: 'affectation/FETCH_AFFECTATION_LIST',
  FETCH_AFFECTATION: 'affectation/FETCH_AFFECTATION',
  CREATE_AFFECTATION: 'affectation/CREATE_AFFECTATION',
  UPDATE_AFFECTATION: 'affectation/UPDATE_AFFECTATION',
  DELETE_AFFECTATION: 'affectation/DELETE_AFFECTATION',
  CANCEL_AFFECTATION: 'affectation/CANCEL_AFFECTATION',
  RESET: 'affectation/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IAffectation>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type AffectationState = Readonly<typeof initialState>;

// Reducer

export default (state: AffectationState = initialState, action): AffectationState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_AFFECTATION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_AFFECTATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_AFFECTATION):
    case REQUEST(ACTION_TYPES.UPDATE_AFFECTATION):
    case REQUEST(ACTION_TYPES.DELETE_AFFECTATION):
    case REQUEST(ACTION_TYPES.CANCEL_AFFECTATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_AFFECTATION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_AFFECTATION):
    case FAILURE(ACTION_TYPES.CREATE_AFFECTATION):
    case FAILURE(ACTION_TYPES.UPDATE_AFFECTATION):
    case FAILURE(ACTION_TYPES.DELETE_AFFECTATION):
    case FAILURE(ACTION_TYPES.CANCEL_AFFECTATION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_AFFECTATION_LIST): {
      const links = parseHeaderForLinks(action.payload.headers.link);

      return {
        ...state,
        loading: false,
        links,
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links),
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    }
    case SUCCESS(ACTION_TYPES.FETCH_AFFECTATION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_AFFECTATION):
    case SUCCESS(ACTION_TYPES.UPDATE_AFFECTATION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CANCEL_AFFECTATION):
    case SUCCESS(ACTION_TYPES.DELETE_AFFECTATION):
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

const apiUrl = 'api/affectations';

// Actions

export const getEntities: ICrudGetAllAction<IAffectation> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_AFFECTATION_LIST,
    payload: axios.get<IAffectation>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IAffectation> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_AFFECTATION,
    payload: axios.get<IAffectation>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IAffectation> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_AFFECTATION,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const updateEntity: ICrudPutAction<IAffectation> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_AFFECTATION,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IAffectation> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_AFFECTATION,
    payload: axios.delete(requestUrl),
  });
  return result;
};

export const cancelEntity: ICrudPutAction<IAffectation> = ({ id, motifAnnulation: value }) => async dispatch => {
  const requestUrl = `${apiUrl}/${id}/cancel`;
  const result = await dispatch({
    type: ACTION_TYPES.CANCEL_AFFECTATION,
    payload: axios.put(requestUrl, { value }),
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
