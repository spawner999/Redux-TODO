import { createStore } from 'redux';
import todoApp from './reducers';
import { loadState , saveState } from './localStorage';
import throttle from 'lodash/throttle';

const addLoggingToDispatch = (store) => {
  const rawDispatch = store.dispatch;
  if (!console.group) {
    return rawDispatch;
  }

  return (action) => {
    console.group(action.type);
    console.log('%c prev state', 'color: gray', store.getState());
    console.log('%c action', 'color: blue', action);
    const returnValue = rawDispatch(action); // dispatch is synchronous
    console.log('%c next state', 'color: green', store.getState());
    console.groupEnd(action.type);
    return returnValue;
  };
};

const configureStore = () => {
  const persistedState = loadState();
  const store = createStore(todoApp, persistedState);

  //only call in development mode
  if(process.env.NODE_ENV !== 'production') {
    store.dispatch = addLoggingToDispatch(store);
  }

  //throttle ensures the inner function is not called too often
  store.subscribe(throttle(() => {
    saveState({
      todos: store.getState().todos // just the todos not the filter
    });
  }, 1000));

  return store; //return a store ready to be used
}

export default configureStore;
