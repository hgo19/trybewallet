import { LOGIN_ACTION } from '../actions';

const INITIAL_STATE = {
  email: '',
  password: '',
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN_ACTION:
    return {
      ...state,
      email: action.email,
      password: action.password,
    };

  default:
    return state;
  }
}

export default user;
