import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWith';
import mockData from './helpers/mockData';

const currenciesArray = Object.keys(mockData).filter((e) => e !== 'USDT');
const WALLET_STATE = {
  currencies: currenciesArray,
  expenses: [
    {
      id: 0,
      value: '1',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: 'Um Dólar',
      exchangeRates: mockData,
    }],
  editor: false,
  idToEdit: 0 };

const VALUE_INPUT_TESTID = 'value-input';
const CURRENCY_INPUT_TESTID = 'currency-input';
const METHOD_INPUT_TESTID = 'method-input';
const TAG_INPUT_TESTID = 'tag-input';
const DESCRIPTION_INPUT_TESTID = 'description-input';

describe('Testa adição e edição de despesas', () => {
  it('Verifica se uma despesa é excluída ao licar no botão.', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState: { wallet: WALLET_STATE } });

    const deleteButon = screen.getByRole('button', { name: /excluir/i });
    expect(deleteButon).toBeInTheDocument();
    const description = screen.getByText(/um dólar/i);
    expect(description).toBeInTheDocument();

    userEvent.click(deleteButon);

    expect(description).not.toBeInTheDocument();
  });

  it('Verifica se uma despesa ao clicar no botão é editada no WalletForm.', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState: { wallet: WALLET_STATE } });

    const editButton = screen.getByRole('button', { name: /editar/i });
    expect(editButton).toBeInTheDocument();

    userEvent.click(editButton);

    const valueInput = screen.getByTestId(VALUE_INPUT_TESTID);
    expect(valueInput).toBeInTheDocument();
    // expect(valueInput).toHaveTextContent('1');

    const currencyInput = screen.getByTestId(CURRENCY_INPUT_TESTID);
    expect(currencyInput).toBeInTheDocument();

    const methodInput = screen.getByTestId(METHOD_INPUT_TESTID);
    expect(methodInput).toBeInTheDocument();

    const tagInput = screen.getByTestId(TAG_INPUT_TESTID);
    expect(tagInput).toBeInTheDocument();

    const descInput = screen.getByTestId(DESCRIPTION_INPUT_TESTID);
    expect(descInput).toBeInTheDocument();
  });
});
