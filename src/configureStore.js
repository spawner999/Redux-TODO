import { createStore } from 'redux';
import todoApp from './reducers';
import { loadState , saveState } from './localStorage';
import throttle from 'lodash/throttle';

const configureStore = () => {
  const persistedState = loadState();
  const store = createStore(todoApp, persistedState);

  //throttle ensures the inner function is not called too often
  store.subscribe(throttle(() => {
    saveState({
      todos: store.getState().todos // just the todos not the filter
    });
  }, 1000));

  return store; //return a store ready to be used
}

export default configureStore;
