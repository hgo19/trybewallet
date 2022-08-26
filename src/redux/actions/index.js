export const LOGIN_ACTION = 'Login';

export const loginAction = (email, password) => ({ type: LOGIN_ACTION, email, password });
