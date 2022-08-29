import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWith';
import WalletForm from '../components/WalletForm';
import mockData from './helpers/mockData';

const VALUE_INPUT_TESTID = 'value-input';
const CURRENCY_INPUT_TESTID = 'currency-input';
const METHOD_INPUT_TESTID = 'method-input';
const TAG_INPUT_TESTID = 'tag-input';
const DESCRIPTION_INPUT_TESTID = 'description-input';

const currenciesArray = Object.keys(mockData).filter((e) => e !== 'USDT');

const WALLET_STATE = {
  currencies: currenciesArray,
  expenses: [{}],
  editor: false,
  idToEdit: 0 };

describe('Testa o componente WalletForm', () => {
  it('Verifica se o WalletForm é renderizado no endereço correto.', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/carteira');

    const valueInput = screen.getByTestId(VALUE_INPUT_TESTID);
    expect(valueInput).toBeInTheDocument();
  });

  it('Verifica se o formulário tem todos os campos pedidos e se eles são alterados.', () => {
    renderWithRouterAndRedux(<WalletForm />, {
      initialState: { wallet: WALLET_STATE } });

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

    userEvent.type(descInput);
  });

  it('Verifica o botão de salvar despesas salva uma despesa', async () => {
    renderWithRouterAndRedux(<WalletForm />, { initialState: { wallet: WALLET_STATE } });

    const saveButton = screen.getByRole('button', { name: /Adicionar despesa/i });
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
    expect(tagInput).toHaveTextContent('Alimentação');
    expect(descInput).toHaveTextContent('');
  });
});
