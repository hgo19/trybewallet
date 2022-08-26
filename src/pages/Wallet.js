import React from 'react';
import WalletForm from '../components/WalletForm';
import Header from '../components/Header';

class Wallet extends React.Component {
  render() {
    return (
      <main>
        <Header />
        <WalletForm />
      </main>
    );
  }
}

export default Wallet;
