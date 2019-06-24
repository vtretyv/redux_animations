import {
    ON_ANIMATION_ENTER,
    ON_ANIMATION_EXIT,
    ON_IDLE_SET,
  } from '../actionTypes/Event';
  
  // Our three types as string literals mapped from corresponding constants.
  export const stateEnum = {
    ON_ENTER: 'onEnter',
    ON_EXIT: 'onExit',
    IDLE: 'idle',
  };
  
  // The current event state (the status)
  const init = {
    state: stateEnum.IDLE,
  };
  
// When an action is fired, the state is updated to the new status.
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
  