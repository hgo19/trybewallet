import currencies from '../../services';

export const LOGIN_ACTION = 'Login';

// export const REQUEST_API = 'Request';
export const REQUEST_SUCCESS = 'Request Sucess';
// export const REQUEST_ERROR = 'Request Error';

export const loginAction = (email) => ({ type: LOGIN_ACTION, email });

// const requestCoin = () => ({ type: REQUEST_API });

const coins = (payload) => ({ type: REQUEST_SUCCESS, payload });

// const requestError = (error) => ({ type: REQUEST_ERROR, error });

export const fetchCoin = () => async (dispatch) => {
  const data = await currencies();
  dispatch(coins(data));
};
