import React, { Component } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';

class Header extends Component {
  render() {
    const { email } = this.props;
    return (
      <header>
        <h1>TrybeWallet</h1>
        <p data-testid="email-field">{email}</p>
        <p>
          Despesas Totais:
          {' '}
          <span data-testid="total-field">0</span>
          <span data-testid="header-currency-field">BRL</span>
        </p>
      </header>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  email: user.email,
});

Header.propTypes = {
  email: Proptypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
