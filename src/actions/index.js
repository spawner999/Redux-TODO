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

const requestTodos = (filter) => ({
  type: 'REQUEST_TODOS',
  filter,
});


const receiveTodos = (filter, response) => ({
  type: 'RECEIVE_TODOS',
  filter,
  response,
});

//thunk, needs dispatch function and getState
export const fetchTodos = (filter) => (dispatch, getState) => {
  if (getIsFetching(getState(), filter)) {
    return Promise.resolve(); //already fetching, avoid race conditions
  }

  dispatch(requestTodos(filter)); //dispatch request async

  return api.fetchTodos(filter).then(response =>
    dispatch(receiveTodos(filter, response))
  );
};
