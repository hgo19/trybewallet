import React from 'react';
import { screen } from '@testing-library/react';
import Table from '../components/Table';
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

describe('Testa o componente Table.js', () => {
  it('Verifica se o componente Table é renderizado no endereço correto', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/carteira');

    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
  });
  it('Verifica se o componente Table tem os elementos corretos', () => {
    renderWithRouterAndRedux(<Table />);

    const theadTable = ['Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda', 'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];

    theadTable.forEach((text) => expect(screen.getByText(text)).toBeInTheDocument());
  });

  it('Verifica se uma despesa passa no state é renderizada', () => {
    renderWithRouterAndRedux(<Table />, { initialState: { wallet: WALLET_STATE } });

    const description = screen.getByText(/um dólar/i);
    expect(description).toBeInTheDocument();
  });
});
