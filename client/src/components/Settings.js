import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import TextField from 'material-ui/TextField';

import { API } from '../constants';

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      logs: {storeLogs: false},
      auth: {
        username: '',
        password: ''
      }
    };

    this.handleToggle = this.handleToggle.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleAuthOnChange = this.handleAuthOnChange.bind(this);
  }

  componentDidMount() {
    let self = this;
    API.getSettings()
      .then((response) => {
        self.setState({
          logs: {storeLogs: response.data.logs.storeLogs},
          auth: {
            username: response.data.auth.username,
            password: response.data.auth.password
          }
        });
      });
  }

  handleToggle(event, toggle) {
    this.setState({logs: { storeLogs: toggle }});
  };

  handleSave() {
    const settings = {
      logs: {storeLogs: this.state.logs.storeLogs},
      auth: {
        username: this.state.auth.username,
        password: this.state.auth.password
      }
    };
    API.setSettings(settings);
  }

  handleAuthOnChange(event) {
    event.preventDefault();

    const { name, value } = event.target;
    const auth = this.state.auth;
    auth[name] = value;

    this.setState({
      auth
    });

    console.log(this.state);
  }

  render() {
    return (
      <div className="container">
        <div className="card">
          <Card>
            <div className="card-body">
              <CardHeader
                title="Settings"
              />
              <CardText>
                <Toggle
                  toggled={this.state.logs.storeLogs}
                  onToggle={this.handleToggle}
                  labelPosition="right"
                  label="Store logs."
                />
              </CardText>
              <br />
              <TextField
                name='username'
                id="settings-username"
                value={this.state.auth.username}
                floatingLabelText="Username"
                floatingLabelFixed={true}
                onChange={this.handleAuthOnChange}
                fullWidth={true}
              />
              <br />
              <TextField
                name='password'
                id="settings-password"
                hintText="Password"
                type="password"
                floatingLabelText="Password"
                floatingLabelFixed={true}
                onChange={this.handleAuthOnChange}
                fullWidth={true}
              />
              <br />
              <CardActions>
                <FlatButton label="Save" onTouchTap={this.handleSave} />
              </CardActions>
            </div>
          </Card>
        </div>
      </div>
    )
  }
}

export default Settings;
