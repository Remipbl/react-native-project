// @flow
import { SET_USERNAME } from './actions';

const initialState = {
  username: 'John Doe',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USERNAME: {
      return action.payload.username;
    }
    default: {
      return state;
    }
  }
};
