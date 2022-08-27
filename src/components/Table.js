import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateExpense } from '../redux/actions';

class Table extends Component {
  deleteExpense = (id) => {
    const { expenses, dispatch } = this.props;
    const deleteCurrency = expenses.filter((e) => e.id !== id);
    dispatch(updateExpense(deleteCurrency));
  };

  render() {
    const { expenses } = this.props;
    return (
      <section>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          {expenses.map((element) => {
            const {
              id,
              currency,
              value,
              method,
              tag,
              description,
              exchangeRates } = element;
            const coinsValues = Object.values(exchangeRates);
            const coinAsk = coinsValues
              .find((coin) => coin.code === currency).ask;
            return (
              <tbody key={ id }>
                <tr>
                  <td>{description}</td>
                  <td>{tag}</td>
                  <td>{method}</td>
                  <td>{Number(value).toFixed(2)}</td>
                  <td>{coinsValues.find((coin) => coin.code === currency).name}</td>
                  <td>{Number(coinAsk).toFixed(2)}</td>
                  <td>
                    {(value * coinAsk).toFixed(2)}
                  </td>
                  <td>Real</td>
                  <td>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ () => this.deleteExpense(id) }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </section>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);
