import { useState, useReducer } from 'react';

export const useModal = (initialMode = false) => {
  const [modalOpen, setModalOpen] = useState(initialMode);
  const toggle = () => {
    // alert('toggle');
    setModalOpen(!modalOpen);
  };
  return { modalOpen, toggle };
};

// const useForm = (initial = {}) => {
//   const [values, setValues] = useState(initial);

//   const handleChange = name => event => {
//     values[name] = event.target.value;
//   }
//   return {values, handleChange}
// }

function init(entities = []) {
  return { entities };
}

export const crudReducer = (state, action) => {
  /* eslint no-console: off */
  console.log('previous state : ', state);
  console.log('action : ', action);
  switch (action.type) {
    case 'CREATE':
      return {
        ...state,
        entities: [...state.entities, action.entity],
      };
    case 'READ': {
      return {
        ...state,
        currentIndex: action.index,
      };
    }
    case 'UPDATE': {
      const entities = [...state.entities];
      entities[state.currentIndex] = { ...entities[state.currentIndex], ...action.entity };
      return {
        ...state,
        entities,
        currentIndex: undefined,
      };
    }
    case 'REMOVE': {
      // const entities = [...state.entities];
      // entities.splice(action.index, 1);
      return {
        ...state,
        entities: state.entities.filter((entity, index) => index !== action.index),
      };
    }
    case 'RESET': {
      // const entities = [...state.entities];
      // entities.splice(action.index, 1);
      return init(action.entities);
    }
    default:
      return state;
  }
};

export const useCrudReducer = (entities = []) => {
  console.log('user reducer ? ', entities);
  const [state, dispatch] = useReducer(crudReducer, { entities });
  const create = entity => dispatch({ type: 'CREATE', entity });
  const read = index => dispatch({ type: 'READ', index });
  const update = entity => dispatch({ type: 'UPDATE', entity });
  const remove = index => dispatch({ type: 'REMOVE', index });
  const reset = data => dispatch({ type: 'RESET', entities: data });
  const get = () => (state.currentIndex !== undefined ? state.entities[state.currentIndex] : null);
  return { state, create, read, update, remove, reset, get };
};

export const useFormInput = (initialValue = undefined) => {
  const [value, setValue] = useState(initialValue);

  const onChange = e => {
    setValue(e.target.value);
  };

  return {
    value,
    onChange,
  };
};
