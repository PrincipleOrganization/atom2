import React from 'react';
import Settings from '../components/Settings.js';

class SettingsPage extends React.Component {
  render() {
    return (
      <Settings handleLogout={this.props.handleLogout} />
    )
  }
}


export default SettingsPage;
