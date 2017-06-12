import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const styleLoginFormButton = {
  margin: 30
}

const LoginForm = ({
  onSubmit,
  onChange,
  errors,
  user
}) => (
  <div className="container centered">
    <div id='login-form'>
      <h2 id='login-header'>Login</h2>
      <h4 id='login-subheader'>login into Atom</h4>

      <form action="/" onSubmit={onSubmit}>
        <TextField
          name='username'
          floatingLabelText="Username"
          floatingLabelFixed={false}
          errorText={errors.username}
          value={user.username}
          onChange={onChange}
        />
        <br/>
        <TextField
          name='password'
          type='password'
          floatingLabelText="Password"
          floatingLabelFixed={false}
          errorText={errors.password}
          value={user.password}
          onChange={onChange}
        />
        <br/>
        <RaisedButton id='login-form-button' label="Login" style={styleLoginFormButton} type="submit" />
      </form>
    </div>
  </div>
)

export default LoginForm;
