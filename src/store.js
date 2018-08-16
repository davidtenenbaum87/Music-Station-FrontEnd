import reducer from './reducer';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';


const store = createStore(reducer, applyMiddleware(thunk));

const addLoggingToDispatch = (store) => {
  const rawDispatch = store.dispatch;
  return (action) => {
    console.group("DISPATCH");
    console.log('%c state before dispatch', 'color: red', store.getState());
    const returnValue = rawDispatch(action);
    console.log('%c state after dispatch', 'color: blue', store.getState());
    console.groupEnd();
    return returnValue;
  }
}

store.dispatch = addLoggingToDispatch(store);

export default store;
