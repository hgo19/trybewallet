import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (
    <Switch>
      <Route exact path="/trybewallet" component={ Login } />
      <Route exact path="/trybewallet/carteira" component={ Wallet } />
    </Switch>
  );
}

export default App;
