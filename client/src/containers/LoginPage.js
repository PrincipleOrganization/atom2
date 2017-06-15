import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Auth, User } from '../modules';
import LoginForm from '../components/LoginForm.js';
import { API } from '../constants';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      user: {
        username: '',
        password: ''
      }
    };

    this.submitForm = this.submitForm.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  // *** METHODS

  onChange(event) {
    const { name, value } = event.target;
    const user = this.state.user;
    user[name] = value;

    this.setState({
      user
    });
  }

  submitForm(event) {
    event.preventDefault();

    const username = encodeURIComponent(this.state.user.username);
    const password = encodeURIComponent(this.state.user.password);

    API.authLogin({ username, password })
      .then((response) => {
        this.setState({
          errors: {}
        });

        Auth.authenticateUser(response.data.token);
        User.init(response.data.user);

        this.props.onLogin();
      })
      .catch((error) => {
        const errors = error.response.data.errors || {};
        errors.summary = error.response.data.message;

        this.setState({
          errors
        });

        this.props.toogleSnakbar(errors.summary);
      });
  }

  render() {
    return (
      <LoginForm onSubmit={this.submitForm} onChange={this.onChange} user={this.state.user} errors={this.state.errors} />
    )
  }
}


export default LoginPage;
