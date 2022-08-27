import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCoins, addExpenseAction } from '../redux/actions';
import currencies from '../services';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: '',
      description: '',
      exchangeRates: '',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCoins());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, async () => {
    });
  };

  handleClick = async () => {
    const data = await currencies();
    this.setState({ exchangeRates: data });

    const { dispatch } = this.props;
    dispatch(addExpenseAction(this.state));

    const { id } = this.state;
    const uptdId = id + 1;
    this.setState({
      id: uptdId,
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: '',
      description: '',
    });
  };

  render() {
    const { moedas } = this.props;
    const { value, currency, method, tag, description } = this.state;
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
              name="value"
              value={ value }
              onChange={ this.handleChange }
              data-testid="value-input"
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select
              id="currency"
              data-testid="currency-input"
              name="currency"
              value={ currency }
              onChange={ this.handleChange }
            >
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
            <select
              id="method"
              data-testid="method-input"
              name="method"
              value={ method }
              onChange={ this.handleChange }
            >
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
            <select
              id="tag"
              data-testid="tag-input"
              name="tag"
              value={ tag }
              onChange={ this.handleChange }
            >
              {tags.map((element, index) => (
                <option
                  key={ index }
                  value={ element }
                >
                  {element}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="expense-description">
            Descrição:
            <input
              type="text"
              id="expense-description"
              name="description"
              value={ description }
              onChange={ this.handleChange }
              data-testid="description-input"
            />
          </label>
          <button
            type="button"
            onClick={ this.handleClick }
          >
            Adicionar despesa

          </button>
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
