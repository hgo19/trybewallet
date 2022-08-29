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
const ALIMENTACAO_STRING = 'Alimentação';

describe('Testa adição e edição de despesas', () => {
  it('Verifica se uma despesa é adicionada a página', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockData,
    }));

    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState: { wallet: WALLET_STATE } });

    const saveButton = screen.getByRole('button', { name: /adicionar despesa/i });
    expect(saveButton).toBeInTheDocument();

    const valueInput = screen.getByTestId(VALUE_INPUT_TESTID);
    expect(valueInput).toBeInTheDocument();

    userEvent.type(valueInput, '1');

    const currencyInput = screen.getByTestId(CURRENCY_INPUT_TESTID);
    expect(currencyInput).toBeInTheDocument();

    userEvent.selectOptions(currencyInput, 'USD');

    const methodInput = screen.getByTestId(METHOD_INPUT_TESTID);
    expect(methodInput).toBeInTheDocument();

    userEvent.selectOptions(methodInput, 'Dinheiro');

    const tagInput = screen.getByTestId(TAG_INPUT_TESTID);
    expect(tagInput).toBeInTheDocument();

    userEvent.selectOptions(tagInput, 'Lazer');

    const descInput = screen.getByTestId(DESCRIPTION_INPUT_TESTID);
    expect(descInput).toBeInTheDocument();

    userEvent.type(descInput, 'Um Dólar');

    userEvent.click(saveButton);
    expect(valueInput).toHaveTextContent('');
    expect(currencyInput).toHaveTextContent('USD');
    expect(methodInput).toHaveTextContent('Dinheiro');
    expect(tagInput).toHaveTextContent(ALIMENTACAO_STRING);
    expect(descInput).toHaveTextContent('');

    const umDolarText = await screen.findByText(/um dólar/i);
    expect(umDolarText).toBeInTheDocument();
  });
  it('Verifica se uma despesa é excluída ao licar no botão.', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockData,
    }));
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState: { wallet: WALLET_STATE } });

    const deleteButon = screen.getByRole('button', { name: /excluir/i });
    expect(deleteButon).toBeInTheDocument();
    const description = screen.getByText(/um dólar/i);
    expect(description).toBeInTheDocument();

    userEvent.click(deleteButon);

    expect(description).not.toBeInTheDocument();
  });

  it('Verifica se uma despesa ao clicar no botão é editada no WalletForm.', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockData,
    }));

    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState: { wallet: WALLET_STATE } });

    const editButton = screen.getByRole('button', { name: /editar/i });
    expect(editButton).toBeInTheDocument();

    userEvent.click(editButton);

    const valueInput = screen.getByTestId(VALUE_INPUT_TESTID);
    expect(valueInput).toBeInTheDocument();
    expect(valueInput).toHaveValue(1);

    const currencyInput = screen.getByTestId(CURRENCY_INPUT_TESTID);
    expect(currencyInput).toBeInTheDocument();
    expect(currencyInput).toHaveValue('USD');

    const methodInput = screen.getByTestId(METHOD_INPUT_TESTID);
    expect(methodInput).toBeInTheDocument();
    expect(methodInput).toHaveValue('Dinheiro');

    const tagInput = screen.getByTestId(TAG_INPUT_TESTID);
    expect(tagInput).toBeInTheDocument();
    expect(tagInput).toHaveValue(ALIMENTACAO_STRING);

    const descInput = screen.getByTestId(DESCRIPTION_INPUT_TESTID);
    expect(descInput).toBeInTheDocument();
    expect(descInput).toHaveValue('Um Dólar');

    const editNewExpenseButton = screen.getByRole('button', { name: /editar despesa/i });
    expect(editNewExpenseButton).toBeInTheDocument();

    userEvent.type(valueInput, '2');
    userEvent.type(descInput, 'Dois Dólares');
    userEvent.click(editNewExpenseButton);

    const doisDolaresText = await screen.findByText(/dois dólares/i);

    expect(doisDolaresText).toBeInTheDocument();
  });
});
