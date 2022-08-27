import currencies from '../../services';

export const LOGIN_ACTION = 'Login';

export const COINS_REQUEST_SUCCESS = 'Request Sucess';

export const ADD_EXPENSE = 'Adicionar Despesa';
export const UPDATE_EXPENSE = 'Atualizar Despesas';

export const loginAction = (email) => ({ type: LOGIN_ACTION, email });

const coins = (payload) => ({ type: COINS_REQUEST_SUCCESS, payload });

export const fetchCoins = () => async (dispatch) => {
  const data = await currencies();
  dispatch(coins(data));
};

export const addExpenseAction = (payload) => ({ type: ADD_EXPENSE, payload });

export const updateExpense = (payload) => ({ type: UPDATE_EXPENSE, payload });
