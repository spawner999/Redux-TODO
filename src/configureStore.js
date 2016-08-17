import { createStore } from 'redux';
import todoApp from './reducers';

//override store.dispatch to show more information
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

//override store.dispatch to support async / promises
const addPromiseSupportToDispatch = (store) => {
  const rawDispatch = store.dispatch;
  return (action) => {
    if (typeof action.then === 'function') { //if the then field of the action is a function (action is a promise)
      return action.then(rawDispatch);  //resolve and then normal dispatch
    }
    return rawDispatch(action); //it's a normal action so just dispatch it
  };
};

const configureStore = () => {
  const store = createStore(todoApp);

  //only call in development mode
  if(process.env.NODE_ENV !== 'production') {
    store.dispatch = addLoggingToDispatch(store);
  }

  //important to override after the other override
  store.dispatch = addPromiseSupportToDispatch(store);

  return store; //return a store ready to be used
}

export default configureStore;
