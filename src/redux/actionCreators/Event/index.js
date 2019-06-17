import {
    ON_ANIMATION_ENTER,
    ON_ANIMATION_EXIT,
    ON_IDLE_SET,
  } from '../../actionTypes/Event';
  import { stateEnum } from '../../reducers/eventReducer';
  
  // G3 Functions
  const onEnter = () => ({
    type: ON_ANIMATION_ENTER,
  });
  
  const onExit = () => ({
    type: ON_ANIMATION_EXIT,
  });
  
  const onIdle = () => ({
    type: ON_IDLE_SET,
  });
  
  export const onStateUpdate = state => dispatch => {
    switch (state) {
      case stateEnum.ON_ENTER:
        dispatch(onEnter());
        break;
      case stateEnum.ON_EXIT:
        dispatch(onExit());
        break;
      case stateEnum.IDLE:
        dispatch(onIdle());
        break;
      default:
        return null;
    }
    return null;
  };