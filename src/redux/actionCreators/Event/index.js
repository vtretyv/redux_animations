import { ON_ANIMATION_ENTER, ON_ANIMATION_EXIT, ON_IDLE_SET } from '../../actionTypes/Event';
import { stateEnum } from '../../reducers/eventReducer';

// The three types of event statuses we use. The types correspond to which string is set.
const onEnter = event => ({
  type: ON_ANIMATION_ENTER,
  event
});

const onExit = event => ({
  type: ON_ANIMATION_EXIT,
  event,
});

const onIdle = event => ({
  type: ON_IDLE_SET,
  event,
});

// Redux function that takes in a status string and updates the state with the string.
export const onStateUpdate = ({state,event}) => dispatch => {
  switch (state) {
    case stateEnum.ON_ENTER:
      dispatch(onEnter(event));
      break;
    case stateEnum.ON_EXIT:
      dispatch(onExit(event));
      break;
    case stateEnum.IDLE:
      dispatch(onIdle(event));
      break;
    default:
      return null;
  }
  return null;
};
