import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
// import thunkMiddleware from 'redux-thunk';
// import logger from 'redux-logger';
// import { content, checkout, media, event } from './reducers';

const masterReducer = combineReducers({
  event,
});

const appReducer = (state, action) => masterReducer(state, action);
export default (store = createStore(appReducer, compose(applyMiddleware())));
