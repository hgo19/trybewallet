import {
  COINS_REQUEST_SUCCESS,
  ADD_EXPENSE,
  DELETE_EXPENSE,
  EDIT_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case COINS_REQUEST_SUCCESS:
    return {
      ...state,
      currencies: Object.keys(action.payload).filter((coin) => coin !== 'USDT'),
    };

  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
      editor: false,
      idToEdit: 0,
    };

  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: [...action.payload],
      editor: false,
      idToEdit: 0,
    };

  case EDIT_EXPENSE:
    return {
      ...state,
      editor: true,
      idToEdit: action.payload,
    };

  default:
    return state;
  }
}

export default wallet;
