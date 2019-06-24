import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
// import { content, checkout, media, event } from './reducers';
import event from './reducers/eventReducer';

const masterReducer = combineReducers({
  event,
});

const appReducer = (state, action) => masterReducer(state, action);
export default (store = createStore(appReducer, compose(applyMiddleware(thunkMiddleware, logger))));
