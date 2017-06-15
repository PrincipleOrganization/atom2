import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import TextField from 'material-ui/TextField';
import { User } from '../modules';

import { API } from '../constants';

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      logs: {storeLogs: false},
      auth: {
        support: {
          username: '',
          password: ''
        },
        admin: {
          username: '',
          password: ''
        },
        user: {
          username: '',
          password: ''
        }
      },
      changed: {
        support: false,
        admin: false,
        user: false
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
            support: {
              username: response.data.auth.support.username,
              password: response.data.auth.support.password
            },
            admin: {
              username: response.data.auth.admin.username,
              password: response.data.auth.admin.password
            },
            user: {
              username: response.data.auth.user.username,
              password: response.data.auth.user.password
            }
          }
        });
      });
  }

  handleToggle(event, toggle) {
    this.setState({logs: { storeLogs: toggle }});
  };

  handleSave() {
    const settings = {
      logs: this.state.logs,
      auth: this.state.auth
    };
    API.setSettings(settings)
      .then(() => {
        const changed = this.state.changed;
        if ((changed.support && User.isSupport()) || (changed.admin && User.isAdmin())) {
          this.props.handleLogout();
        }
      });
  }

  handleAuthOnChange(event) {
    event.preventDefault();

    const { name, value } = event.target;
    const auth = this.state.auth;
    const nameParts = name.split('.');
    auth[nameParts[0]][nameParts[1]] = value;

    const changed = {
      support: this.state.changed.support || nameParts[0] === 'support',
      admin: this.state.changed.admin || nameParts[0] === 'admin',
      user: this.state.changed.user || nameParts[0] === 'user'
    };

    this.setState({ auth, changed });
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
              <h3>
                Logs
              </h3>
              <CardText>
                <Toggle
                  toggled={this.state.logs.storeLogs}
                  onToggle={this.handleToggle}
                  labelPosition="right"
                  label="Store logs."
                />
              </CardText>
              <br />
              <h3>
                Users
              </h3>

              {User.isSupport() &&
              <div>
                <h4>
                  Support
                </h4>
                <TextField
                  name='support.username'
                  id="settings-username-support"
                  value={this.state.auth.support.username}
                  floatingLabelText="Username"
                  floatingLabelFixed={true}
                  onChange={this.handleAuthOnChange}
                  fullWidth={true}
                />
                <br />
                <TextField
                  name='support.password'
                  id="settings-password-support"
                  hintText="Password"
                  type="password"
                  floatingLabelText="Password"
                  floatingLabelFixed={true}
                  onChange={this.handleAuthOnChange}
                  fullWidth={true}
                />
                <br />
              </div>}

              <h4>
                Admin
              </h4>
              <TextField
                name='admin.username'
                id="settings-username-admin"
                value={this.state.auth.admin.username}
                floatingLabelText="Username"
                floatingLabelFixed={true}
                onChange={this.handleAuthOnChange}
                fullWidth={true}
              />
              <br />
              <TextField
                name='admin.password'
                id="settings-password-admin"
                hintText="Password"
                type="password"
                floatingLabelText="Password"
                floatingLabelFixed={true}
                onChange={this.handleAuthOnChange}
                fullWidth={true}
              />
              <br />
              <h4>
                Regular user
              </h4>
              <TextField
                name='user.username'
                id="settings-username-user"
                value={this.state.auth.user.username}
                floatingLabelText="Username"
                floatingLabelFixed={true}
                onChange={this.handleAuthOnChange}
                fullWidth={true}
              />
              <br />
              <TextField
                name='user.password'
                id="settings-password-user"
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
