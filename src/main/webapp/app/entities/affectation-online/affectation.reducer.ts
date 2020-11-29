import axios from 'axios';
import {
  parseHeaderForLinks,
  loadMoreDataWhenScrolled,
  ICrudGetAction,
  ICrudGetAllAction,
  ICrudPutAction,
  ICrudDeleteAction,
  ICrudSearchAction,
} from 'react-jhipster';

import qs from 'querystring';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE, convertFilterDashToPoint, ISearchAction } from 'app/shared/reducers/action-type.util';

import { IAffectation, defaultValue } from 'app/shared/model/affectation.model';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';

export const ACTION_TYPES = {
  FETCH_CURRENT_AFFECTATION_LIST: 'affectation/online/FETCH_CURRENT_AFFECTATION_LIST',
  FETCH_AFFECTATION_LIST: 'affectation/online/FETCH_AFFECTATION_LIST',
  SEARCH: 'affectation/online/SEARCH_AFFECTATION',
  FETCH_AFFECTATION: 'affectation/online/FETCH_AFFECTATION',
  CREATE_AFFECTATION: 'affectation/online/CREATE_AFFECTATION',
  UPDATE_AFFECTATION: 'affectation/online/UPDATE_AFFECTATION',
  DELETE_AFFECTATION: 'affectation/online/DELETE_AFFECTATION',
  CANCEL_AFFECTATION: 'affectation/online/CANCEL_AFFECTATION',
  RESET: 'affectation/online/RESET',
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
  filters: {
    'dateAffectation-greaterThanOrEqual': '',
    'dateAffectation-lessThanOrEqual': '',
    'attributeurId-equals': '',
    'statut-equals': '',
  },
};

export type AffectationOnlineState = Readonly<typeof initialState>;

// Reducer

export default (state: AffectationOnlineState = initialState, action): AffectationOnlineState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CURRENT_AFFECTATION_LIST):
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
    case FAILURE(ACTION_TYPES.FETCH_CURRENT_AFFECTATION_LIST):
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
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 20),
      };
    }
    case SUCCESS(ACTION_TYPES.FETCH_CURRENT_AFFECTATION_LIST): {
      const { data } = action.payload;
      return {
        ...state,
        loading: false,
        entities: data,
        totalItems: data.length,
      };
    }
    case ACTION_TYPES.SEARCH:
      return {
        ...state,
        filters: action.filters,
      };
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

export const getCurrentAffectations = () => {
  const requestUrl = `${apiUrl}/current`;
  return {
    type: ACTION_TYPES.FETCH_CURRENT_AFFECTATION_LIST,
    payload: axios.get<IAffectation>(`${requestUrl}?cacheBuster=${new Date().getTime()}`),
  };
};

export const searchEntities: ISearchAction<IAffectation> = ({ filters = {}, page = 0, size = 5, sort = 'dateAffectation,desc' }) => (
  dispatch,
  getState
) => {
  const account = getState().authentication.account;
  const isAdmin = hasAnyAuthority(account.authorities, [AUTHORITIES.ADMIN]);
  const _filters = { ...filters };
  if (!isAdmin) {
    _filters['attributeurId-equals'] = account.id;
  }
  const fromDate = filters['dateAffectation-greaterThanOrEqual'];
  const toDate = filters['dateAffectation-lessThanOrEqual'];
  if (fromDate) {
    _filters['dateAffectation-greaterThanOrEqual'] = `${fromDate}T00:00:00Z`;
  }
  if (toDate) {
    _filters['dateAffectation-lessThanOrEqual'] = `${toDate}T23:59:59Z`;
  }
  // console.warn('from date ?', fromDate);
  // console.warn('to date ?', toDate);
  // console.warn('values apres ?', _filters);
  dispatch({
    type: ACTION_TYPES.FETCH_AFFECTATION_LIST,
    payload: axios.get<IAffectation>(apiUrl, {
      params: { ...convertFilterDashToPoint(_filters), page, size, sort, cacheBuster: new Date().getTime() },
      paramsSerializer(params) {
        // console.warn('params ', params);
        return qs.stringify(params);
      },
    }),
  });
};

export const getEntities: ISearchAction<IAffectation> = ({ filters = {}, page = 0, size = 20, sort }) => {
  return searchEntities({ filters, page, size, sort });
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

export const search = filters => ({
  type: ACTION_TYPES.SEARCH,
  filters,
});
