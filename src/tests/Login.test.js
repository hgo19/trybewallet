import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWith';
import App from '../App';

describe('Testa se a página de login renderiza corretamente', () => {
  it('Verifica se o login é renderizado na rota certa', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId('email-input');
    expect(emailInput).toBeInTheDocument();

    const passInput = screen.getByTestId('password-input');
    expect(passInput).toBeInTheDocument();

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  // it('Verifica se ', () => {

  // })
});
