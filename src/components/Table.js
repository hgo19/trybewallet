import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
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
                    <button type="button">
                      Deletar
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
};

export default connect(mapStateToProps)(Table);
