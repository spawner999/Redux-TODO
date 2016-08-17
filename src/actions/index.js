import { v4 } from 'node-uuid'; //create serialized id
import { getIsFetching } from '../reducers';
import * as api from '../api';

export const addTodo = (text) => ({
  type: 'ADD_TODO',
  id: v4(),
  text,
});

export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id,
});

//thunk, needs dispatch function and getState
export const fetchTodos = (filter) => (dispatch, getState) => {
  if (getIsFetching(getState(), filter)) {
    return Promise.resolve(); //already fetching, avoid race conditions
  }

  dispatch({
    type: 'FETCH_TODOS_REQUEST',
    filter,
  }); //dispatch request async

  return api.fetchTodos(filter).then(
    response => {
      dispatch({
        type: 'FETCH_TODOS_SUCCESS',
        filter,
        response,
      });
    },
    error => {
      dispatch({
        type: 'FETCH_TODOS_FAILURE',
        filter,
        message: error.message || 'something went wrong'
      });
    }
  );
  
};
