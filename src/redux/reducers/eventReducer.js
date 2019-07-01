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

  export const stateEnumEventTypes = {
    DOWN_AND_SCALE : 'down_and_scale',
    UP_AND_SCALE : 'up_and_scale',  
    ROTATE_AND_SCALE : 'rotate_and_scale',
    ROTATE_AND_SRHINK : 'rotate_and_shrink',
    NO_EVENT: 'no_event',
  };
  
  // The current event state (the status)
  const init = {
    state: stateEnum.IDLE,
    event: stateEnumEventTypes.NO_EVENT,
  };
  
// When an action is fired, the state is updated to the new status.
  const event = (state = init, action) => {
    switch (action.type) {
      case ON_ANIMATION_ENTER:
        return {
          ...state,
            state: stateEnum.ON_ENTER,
            event: action.event,
        };
      case ON_ANIMATION_EXIT:
        return {
          ...state,
            state: stateEnum.ON_EXIT,
            event: action.event,
        };
      case ON_IDLE_SET:
        return {
          ...state,
            state: stateEnum.IDLE,
            event: action.event,
        };
      default:
        return state;
    }
  };
  
  export default event;
  