import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCoins, addExpenseAction, deleteExpense } from '../redux/actions';
import currencies from '../services';

const ALIMENTACAO_STATE = 'Alimentação';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: ALIMENTACAO_STATE,
      description: '',
      exchangeRates: '',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCoins());
  }

  componentDidUpdate(prevProps) {
    const { editor } = this.props;
    if (editor !== prevProps.editor) { this.handleEditExpense(); }
  }

  handleEditExpense = () => {
    const { idToEdit, expenses, editor } = this.props;
    if (editor) {
      const selectedExpense = expenses.find((e) => e.id === idToEdit);
      this.setState({
        ...selectedExpense });
    } else {
      this.setState({
        id: 0,
        value: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: ALIMENTACAO_STATE,
        description: '',
        exchangeRates: '',
      });
    }
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, async () => {
    });
  };

  handleClick = async () => {
    const data = await currencies();
    this.setState({ exchangeRates: data });
    const {
      id,
      value,
      currency,
      method,
      tag,
      description,
      exchangeRates } = this.state;
    const { dispatch, editor, idToEdit, expenses } = this.props;

    if (editor) {
      const editLog = expenses
        .map((e) => (e.id === idToEdit ? { ...e, ...this.state } : { ...e })); /* /Ajuda do Aluno Wayne/ */
      dispatch(deleteExpense(editLog));
    } else {
      dispatch(addExpenseAction({ id,
        value,
        currency,
        method,
        tag,
        description,
        exchangeRates }));
    }

    const uptdId = id + 1;
    this.setState({
      id: uptdId,
      value: '',
      description: '',
    });
  };

  render() {
    const { moedas, editor } = this.props;
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
            {editor ? 'Editar Despesa' : 'Adicionar despesa'}

          </button>
        </form>
      </section>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  moedas: wallet.currencies,
  expenses: wallet.expenses,
  editor: wallet.editor,
  idToEdit: wallet.idToEdit,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  moedas: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  editor: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
