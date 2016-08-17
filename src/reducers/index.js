import { combineReducers } from 'redux';
import byId, * as fromById from './byId';
import createList, * as fromList from './createList';

const listByFilter = combineReducers({
  all: createList('all'),
  active: createList('active'),
  completed: createList('completed'),
})

const todos = combineReducers({
  byId,
  listByFilter
});

export default todos;//reducer function

export const getVisibleTodos = (state, filter) => { // selector function, it selects something from the current state
  const ids = fromList.getIds(state.listByFilter[filter]);
  return ids.map(id => fromById.getTodo(state.byId, id)); //go through the getTodo function, not assumuning state.byID is necessaraly a lookup table, we are encapsulating the the reducer's state inside of the reducer itself
};
