import _ from 'lodash';

export const entitiesConstants = {
  MERGE: 'MERGE',
  MERGE_ENTITY: 'MERGE_ENTITY',
  MERGE_ENTITIES: 'MERGE_ENTITIES',
  DELETE_ENTITY: 'DELETE_ENTITY',
};

const mergeAction = response => ({
  ...response,
  type: entitiesConstants.MERGE,
});
const mergeEntityAction = (model, id, value) => ({
  type: entitiesConstants.MERGE_ENTITY,
  model,
  id,
  value,
});
const deleteEntityAction = (model, id) => ({
  type: entitiesConstants.DELETE_ENTITY,
  model,
  id,
});
const mergeEntitiesAction = (model, values) => ({
  type: entitiesConstants.MERGE_ENTITIES,
  model,
  values,
});

export const entitiesActions = { mergeAction, mergeEntityAction, mergeEntitiesAction, deleteEntityAction };

export const entitySelector = (model, id) => state => {
  const { entities } = state;
  return entities[model] && entities[model][id] ? entities[model][id] : undefined;
};
export const entitiesSelector = state => state.entities;

const mergeEntity = (curentEntity = {}, action) => ({
  ...curentEntity,
  ...action.value,
});
// const mergeEntities = (models, action) => _.mergeWith({}, models, action.values, ignoreMergeArray);
const mergeEntities = (models, action) => {
  const result = { ...models };
  _.forEach(action.values, (value, id) => {
    if (value) {
      result[id] = mergeEntity(result[id], { value });
    } else {
      result[id] = null;
    }
  });
  return result;
};

const entity = (models = {}, action) => {
  switch (action.type) {
    case entitiesConstants.MERGE_ENTITY:
      return { ...models, [action.id]: mergeEntity(models[action.id], action) };
    case entitiesConstants.MERGE_ENTITIES:
      return mergeEntities(models, action);
    case entitiesConstants.DELETE_ENTITY:
      return { ...models, [action.id]: null };
    default:
      return models;
  }
};
const initialState = {};
export type EntitiesState = Readonly<typeof initialState>;
// Updates an entity cache in response to any action with payload.entities.
export default (state: EntitiesState = initialState, action): EntitiesState => {
  if (action.payload && action.payload.entities) {
    // return _.mergeWith({}, state, action.payload.entities, ignoreMergeArray);
    const result = { ...state };
    _.forEach(action.payload.entities, (values, model) => {
      result[model] = mergeEntities(result[model], { values });
    });
    return result;
  }
  switch (action.type) {
    case entitiesConstants.MERGE_ENTITIES:
    case entitiesConstants.MERGE_ENTITY:
    case entitiesConstants.DELETE_ENTITY:
      return { ...state, [action.model]: entity(state[action.model], action) };
    default:
      return state;
  }
};
