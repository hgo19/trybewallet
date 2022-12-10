import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense, expenseToEdit } from '../redux/actions';

class Table extends Component {
  deleteExpense = (id) => {
    const { expenses, dispatch } = this.props;
    const deleteCurrency = expenses.filter((e) => e.id !== id);
    dispatch(deleteExpense(deleteCurrency));
  };

  editExpense = (id) => {
    const { dispatch } = this.props;
    dispatch(expenseToEdit(id));
  };

  render() {
    const { expenses } = this.props;
    return (
      <section>
        <table className="table table-bordered table-sm align-middle">
          <thead>
            <tr className="table-dark">
              <th scope="col">Descrição</th>
              <th scope="col">Tag</th>
              <th scope="col">Método de pagamento</th>
              <th scope="col">Valor</th>
              <th scope="col">Moeda</th>
              <th scope="col">Câmbio utilizado</th>
              <th scope="col">Valor convertido</th>
              <th scope="col">Moeda de conversão</th>
              <th scope="col">Editar/Excluir</th>
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
                      data-testid="edit-btn"
                      onClick={ () => this.editExpense(id) }
                    >
                      Editar
                    </button>
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
