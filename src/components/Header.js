import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const totalField = expenses.reduce((acc, curr) => {
      const askValue = curr.exchangeRates[curr.currency].ask;
      const finalValue = curr.value * askValue;
      return acc + finalValue;
    }, 0);

    return (
      <header
        className="container-fluid d-flex justify-content-between align-items-center "
        style={ { background: 'white' } }
      >
        <h1 className="h1">TrybeWallet</h1>
        <div>
          <p data-testid="email-field">{email}</p>
          <p>
            Despesas Totais:
            {' '}
            <span data-testid="total-field">{totalField.toFixed(2)}</span>
            <span data-testid="header-currency-field">BRL</span>
          </p>
        </div>
      </header>
    );
  }
}

const mapStateToProps = ({ user, wallet }) => ({
  email: user.email,
  expenses: wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default connect(mapStateToProps)(Header);
