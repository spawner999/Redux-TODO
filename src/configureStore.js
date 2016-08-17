import { createStore } from 'redux';
import todoApp from './reducers';

//override store.dispatch to show more information
//function that return a functions that returns a function, common in functional programming, it's called currying
const logger = (store) => {
  return (next) => {
    if (!console.group) {
      return next;
    }

    return (action) => {
      console.group(action.type);
      console.log('%c prev state', 'color: gray', store.getState());
      console.log('%c action', 'color: blue', action);
      const returnValue = next(action); // dispatch is synchronous
      console.log('%c next state', 'color: green', store.getState());
      console.groupEnd(action.type);
      return returnValue;
    };
  };
};

//same here, think of it as function with different arguments that are applied as they become available
const promise = (store) => (next) => (action) => {
  if (typeof action.then === 'function') { //if the then field of the action is a function (action is a promise)
    return action.then(next);  //resolve and then normal dispatch
  }
  return next(action); //it's a normal action so just dispatch it
};

//overrides dispatch multiple times
const wrapDispatchWithMiddlewares = (store, middlewares) => {
  middlewares.slice().reverse().forEach(middleware => //revert middleware to apply promise last
    store.dispatch = middleware(store)(store.dispatch) //store.dispatch would be the 'next' argument
  );
};

const configureStore = () => {
  const store = createStore(todoApp);
  const middlewares =[promise];

  if(process.env.NODE_ENV !== 'production') {
    middlewares.push(logger);
  }


  wrapDispatchWithMiddlewares(store, middlewares);

  return store; //return a store ready to be used
}

export default configureStore;
