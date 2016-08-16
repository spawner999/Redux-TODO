import { combineReducers } from 'redux';
import todo from './todo';

const byId = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_TODO':
    case 'TOGGLE_TODO':
      return {
        ...state,
        [action.id]: todo(state[action.id], action), //computed property
      }
    default:
    return state;
  }
};

//lookup table
const allIds = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, action.id];
    default:
      return state;
  }
};

const todos = combineReducers({
  byId,
  allIds
});

export default todos;//reducer function

const getAllTodos = (state) =>
  state.allIds.map(id => state.byId[id]); // map all the ids from allIds to the corresponding todos from byId

export const getVisibleTodos = (state, filter) => { // selector function, it selects something from the current state
  const allTodos = getAllTodos(state);
  switch (filter) {
    case 'all':
      return allTodos;
    case 'active':
      return allTodos.filter(t => !t.completed);
    case 'completed':
      return allTodos.filter(t => t.completed);
    default:
      throw new Error(`Unknown filter: ${filter}`);
  }
};
