import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWith';
import App from '../App';

const EMAIL_INPUT_TESTID = 'email-input';
const PASS_INPUT_TESTID = 'password-input';

describe('Testa se a página de login renderiza corretamente', () => {
  it('Verifica se o login é renderizado na rota certa', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId(EMAIL_INPUT_TESTID);
    expect(emailInput).toBeInTheDocument();

    const passInput = screen.getByTestId(PASS_INPUT_TESTID);
    expect(passInput).toBeInTheDocument();

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Verifica se o botão só é habilitado quando as verificações estão corretas', () => {
    renderWithRouterAndRedux(<App />);

    const validEmail = 'teste@teste.com';
    const validPass = '123456';

    const emailInput = screen.getByTestId(EMAIL_INPUT_TESTID);
    const passInput = screen.getByTestId(PASS_INPUT_TESTID);
    const loginButton = screen.getByRole('button', { name: /entrar/i });

    expect(loginButton).toBeInTheDocument();

    userEvent.type(emailInput, 'teste@teste');
    expect(loginButton).toHaveAttribute('disabled');

    userEvent.type(passInput, '1234');
    expect(loginButton).toHaveAttribute('disabled');

    userEvent.type(emailInput, validEmail);
    userEvent.type(passInput, validPass);
    expect(loginButton).not.toHaveAttribute('disabled');
  });

  it('Verifica se ao clicar no botao a página redirecionadda é "/carteira"', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const validEmail = 'teste@teste.com';
    const validPass = '123456';

    const emailInput = screen.getByTestId(EMAIL_INPUT_TESTID);
    const passInput = screen.getByTestId(PASS_INPUT_TESTID);
    const loginButton = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(emailInput, validEmail);
    userEvent.type(passInput, validPass);
    expect(loginButton).not.toHaveAttribute('disabled');

    userEvent.click(loginButton);

    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
  });
});
