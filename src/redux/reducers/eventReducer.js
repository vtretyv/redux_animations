import {
    ON_ANIMATION_ENTER,
    ON_ANIMATION_EXIT,
    ON_IDLE_SET,
  } from '../actionTypes/Event';
  
  export const stateEnum = {
    ON_ENTER: 'onEnter',
    ON_EXIT: 'onExit',
    IDLE: 'idle',
  };
  
  const init = {
    state: stateEnum.IDLE,
  };
  
  const event = (state = init, action) => {
    switch (action.type) {
      case ON_ANIMATION_ENTER:
        return {
          ...state,
          state: stateEnum.ON_ENTER,
        };
      case ON_ANIMATION_EXIT:
        return {
          ...state,
          state: stateEnum.ON_EXIT,
        };
      case ON_IDLE_SET:
        return {
          ...state,
          state: stateEnum.IDLE,
        };
      default:
        return state;
    }
  };
  
  export default event;
  