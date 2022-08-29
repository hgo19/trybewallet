import React from 'react';
import { screen } from '@testing-library/react';
import Header from '../components/Header';
import renderWithRouterAndRedux from './helpers/renderWith';
import App from '../App';
import mockData from './helpers/mockData';

const EMAIL_TEXT_ID = 'email-field';
const TOTAL_FIELD_ID = 'total-field';
const CURRENCY_FIELD_ID = 'header-currency-field';

const USER_STATE = {
  email: 'teste@teste.com',
};

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
      description: '1',
      exchangeRates: mockData,
    }],
  editor: false,
  idToEdit: 0 };

describe('Testa o componente Header.js', () => {
  it('Verifica se o componente Header é renderizado no endereço correto', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/carteira');

    const trybeWallet = screen.getByRole('heading', { name: /trybewallet/i, level: 1 });
    expect(trybeWallet).toBeInTheDocument();
  });
  it('Verifica se o componente Header tem as informações corretas', () => {
    renderWithRouterAndRedux(<Header />, {
      initialState: { user: USER_STATE, wallet: WALLET_STATE } });

    const emailText = screen.getByTestId(EMAIL_TEXT_ID);
    expect(emailText).toBeInTheDocument();
    expect(emailText).toHaveTextContent('teste@teste.com');

    const totalField = screen.getByTestId(TOTAL_FIELD_ID);
    expect(totalField).toBeInTheDocument();
    expect(totalField).toHaveTextContent('4.75');

    const currencyField = screen.getByTestId(CURRENCY_FIELD_ID);
    expect(currencyField).toBeInTheDocument();
    expect(currencyField).toHaveTextContent('BRL');
  });
});
