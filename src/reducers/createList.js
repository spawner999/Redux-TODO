import { combineReducers } from 'redux';

const createList = (filter) => {
  const handleToggle = (state, action) => {
    const { result: toggledId, entities } = action.response; //reference Id and list of todos
    const { completed } = entities.todos[toggledId]; //reference single todo's completed field
    const shouldRemove = ( completed && filter === 'active') || (!completed && filter === 'completed'); //we want to remove it in these two cases
    return shouldRemove ?
      state.filter(id => id !== toggledId) :
      state;
  };

  const ids = (state = [], action) => {
    switch (action.type) {
      case 'FETCH_TODOS_SUCCESS':
        return filter === action.filter ? //filters matching?
        action.response.result : //get the response from server then save the ids
        state; //else return state
      case 'ADD_TODO_SUCCESS':
        return filter !== 'completed' ? //filter is not 'completed'?
        [...state, action.response.result] : //add id to the registry
        state; //else return state
      case 'TOGGLE_TODO_SUCCESS':
        return handleToggle(state, action);
      default:
        return state;
    }
  };

  const isFetching = (state = false, action) => {
    if (action.filter !== filter) {
      return state;
    }
    switch (action.type) {
      case 'FETCH_TODOS_REQUEST':
          return true;
      case 'FETCH_TODOS_SUCCESS':
      case 'FETCH_TODOS_FAILURE':
          return false;
      default:
        return state;
    }
  };

  const errorMessage = (state = null, action) => {
    if (filter !== action.filter) {
      return state;
    }
    switch (action.type) {
      case 'FETCH_TODOS_REQUEST':
      case 'FETCH_TODOS_SUCCESS':
        return null; //reset error message after retry or success
      case 'FETCH_TODOS_FAILURE':
          return action.message; //set error message
      default:
        return state;
    }
  }

  return combineReducers({
    ids,
    isFetching,
    errorMessage,
  });
};

export default createList;

export const getIds = (state) => state.ids;

export const getIsFetching = (state) => state.isFetching;

export const getErrorMessage = (state) => state.errorMessage;
