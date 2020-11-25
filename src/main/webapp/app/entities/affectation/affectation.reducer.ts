import { cleanEntity } from 'app/shared/util/entity-utils';

import { IAffectation, defaultValue } from 'app/shared/model/affectation.model';
import { ACTION_TYPES as SESSION_ACTION_TYPES } from 'app/entities/session/session.reducer';
import { SUCCESS } from 'app/shared/reducers/action-type.util';

export const ACTION_TYPES = {
  FETCH_CURRENT_AFFECTATION_LIST: 'affectation/FETCH_CURRENT_AFFECTATION_LIST',
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
  /* eslint no-console: off */
  console.log(action);
  switch (action.type) {
    case ACTION_TYPES.CREATE_AFFECTATION: {
      console.log('create affectation ? ', [action.payload].concat(state.entities));
      return {
        ...state,
        entity: defaultValue,
        entities: [action.payload].concat(state.entities),
        totalItems: state.totalItems + 1,
      };
    }
    case ACTION_TYPES.DELETE_AFFECTATION: {
      const entities = [...state.entities];
      entities[action.index] = { ...entities[action.index], statut: 'S' };
      return {
        ...state,
        entities,
      };
    }
    case ACTION_TYPES.CANCEL_AFFECTATION: {
      const { index, motifAnnulation } = action;
      const entities = [...state.entities];
      entities[index] = { ...entities[index], statut: 'N', motifAnnulation };
      return {
        ...state,
        entities,
      };
    }
    case SUCCESS(SESSION_ACTION_TYPES.CLOSE_SESSION):
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

export const createEntity = entity => ({
  type: ACTION_TYPES.CREATE_AFFECTATION,
  payload: cleanEntity(entity),
});

export const deleteEntity = index => ({
  type: ACTION_TYPES.DELETE_AFFECTATION,
  index,
});

export const cancelEntity = (index, motifAnnulation) => ({
  type: ACTION_TYPES.CANCEL_AFFECTATION,
  index,
  motifAnnulation,
});

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
