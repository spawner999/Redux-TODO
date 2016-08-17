import { combineReducers } from 'redux';

//Lookup table, has all todos with id key
const byId = (state = {}, action) => {
  switch (action.type) {
    case 'RECEIVE_TODOS':
      const nextState = { ...state }; //shallow copy of the current state (it corresponds to the lookup table)
      action.response.forEach(todo => {
        nextState[todo.id] = todo; //fine to use a mutation in this case, this adds stuff based on response
      });
      return nextState;
    default:
    return state;
  }
};

//these contains id based on filters
const allIds = (state = [], action) => {
  if(action.filter !== 'all') {
    return state;
  }
  switch (action.type) {
    case 'RECEIVE_TODOS':
      return action.response.map(todo => todo.id); //get the response from server then save the ids
    default:
      return state;
  }
};

const activeIds = (state = [], action) => {
  if(action.filter !== 'active') {
    return state;
  }
  switch (action.type) {
    case 'RECEIVE_TODOS':
      return action.response.map(todo => todo.id); //get the response from server then save the ids
    default:
      return state;
  }
};

const completedIds = (state = [], action) => {
  if(action.filter !== 'completed') {
    return state;
  }
  switch (action.type) {
    case 'RECEIVE_TODOS':
      return action.response.map(todo => todo.id); //get the response from server then save the ids
    default:
      return state;
  }
};

const idsByFilter = combineReducers({
  all: allIds,
  active: activeIds,
  completed: completedIds,
})

const todos = combineReducers({
  byId,
  idsByFilter
});

export default todos;//reducer function

export const getVisibleTodos = (state, filter) => { // selector function, it selects something from the current state
  const ids = state.idsByFilter[filter];
  return ids.map(id => state.byId[id]); //map the ids by filter to the lookup table
};
