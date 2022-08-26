import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCoin } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCoin());
  }

  render() {
    const { moedas } = this.props;
    const paymentsTypes = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <section>
        WalletForm
        <form>
          <label htmlFor="expense-value">
            Valor:
            <input
              type="number"
              id="expense-value"
              data-testid="value-input"
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select id="currency" data-testid="currency-input">
              {moedas.map((coin, index) => (
                <option
                  key={ index }
                  value={ coin }
                >
                  {coin}
                </option>
              )) }
            </select>
          </label>
          <label htmlFor="method">
            Método de Pagamento:
            <select id="method" data-testid="method-input">
              {paymentsTypes.map((type, index) => (
                <option
                  key={ index }
                  value={ type }
                >
                  {type}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="tag">
            TAG:
            <select id="tag" data-testid="tag-input">
              {tags.map((tag, index) => (
                <option
                  key={ index }
                  value={ tag }
                >
                  {tag}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="expense-description">
            Descrição:
            <input
              type="text"
              id="expense-description"
              data-testid="description-input"
            />
          </label>
        </form>
      </section>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  moedas: wallet.currencies,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  moedas: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
