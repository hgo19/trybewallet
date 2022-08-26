import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginAction } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isDisabled: true,
    };
  }

  loginValidation = () => {
    const { email, password } = this.state;
    const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    const checkEmail = pattern.test(email);
    const MIN_PASS_LENGTH = 6;
    const checkPassLength = password.length >= MIN_PASS_LENGTH;
    const finalCheck = checkEmail && checkPassLength;
    this.setState({ isDisabled: !finalCheck });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      this.loginValidation();
    });
  };

  handleSubmit = (event) => {
    const { dispatch, history } = this.props;
    const { email } = this.state;
    event.preventDefault();
    dispatch(loginAction(email));
    history.push('/carteira');
  };

  render() {
    const { email, password, isDisabled } = this.state;
    return (
      <main>
        <form onSubmit={ this.handleSubmit }>
          <label htmlFor="emailInput">
            Email:
            <input
              id="emailInput"
              type="email"
              name="email"
              value={ email }
              onChange={ this.handleChange }
              data-testid="email-input"
            />
          </label>
          <label htmlFor="passInput">
            Senha:
            <input
              id="passInput"
              type="password"
              name="password"
              value={ password }
              onChange={ this.handleChange }
              data-testid="password-input"
            />
          </label>
          <button
            type="submit"
            disabled={ isDisabled }
          >
            Entrar

          </button>
        </form>
      </main>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
