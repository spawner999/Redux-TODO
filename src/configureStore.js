import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import todoApp from './reducers';


const configureStore = () => {
  const middlewares =[promise];
  if(process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger());
  }

  return createStore(
    todoApp,
    //persistedState goes here if present
    applyMiddleware(...middlewares) //this argument is called enhancer
  );
}

export default configureStore;
