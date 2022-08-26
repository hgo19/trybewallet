import { LOGIN_ACTION } from '../actions';

const INITIAL_STATE = {
  email: '',
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN_ACTION:
    return {
      ...state,
      email: action.email,
    };

  default:
    return state;
  }
}

export default user;
