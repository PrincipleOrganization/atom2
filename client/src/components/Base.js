import React from 'react';
import { Auth, User } from '../modules';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Snackbar from 'material-ui/Snackbar';
import IconCode from 'material-ui/svg-icons/action/code';
import IconDashboard from 'material-ui/svg-icons/action/dashboard';
import IconSettings from 'material-ui/svg-icons/action/settings';
import IconLogout from 'material-ui/svg-icons/action/exit-to-app';
import IconInfo from 'material-ui/svg-icons/action/info';
import IconNavigationClose from 'material-ui/svg-icons/navigation/close';
import SettingsPage from '../containers/SettingsPage.js';
import InfoPage from '../containers/InfoPage.js';
import LoginPage from '../containers/LoginPage.js';
import { API } from '../constants';

const PAGE_INFO = 'info';
const PAGE_SETTINGS = 'settings';

export default class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: PAGE_INFO,
      openedSideMenu: false,
      userAuthenticated: false,
      showSnakbar: false,
      messageSnakbar: ''
    };

    this.isUserAuthenticated = this.isUserAuthenticated.bind(this);
    this.toogleSnakbar = this.toogleSnakbar.bind(this);

    this.handleToggleSideMenu = this.handleToggleSideMenu.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleRequestCloseSnakbar = this.handleRequestCloseSnakbar.bind(this);

    this.handleOpenSettings = this.handleOpenSettings.bind(this);
    this.handleOpenInfo = this.handleOpenInfo.bind(this);
  }

  // *** METHODS

  isUserAuthenticated() {
    const isUserAuthenticated = Auth.isUserAuthenticated();
    this.setState({
      openedSideMenu: false,
      userAuthenticated: isUserAuthenticated
    });
  }

  toogleSnakbar(message) {
    this.setState({
      showSnakbar: !this.state.showSnakbar,
      messageSnakbar: message
    });
  };

  // *** COMPONENT EVENETS

  componentDidMount() {
    this.isUserAuthenticated();
  }

  // *** EVENETS

  handleToggleSideMenu() {
    this.setState({ openedSideMenu: !this.state.openedSideMenu });
  }

  handleOpenEditor() {
    API.openEditor();
  }

  handleOpenConfiguration() {
    API.openConfiguration();
  }

  handleOpenSettings() {
    this.setState({ currentPage: PAGE_SETTINGS });
  }

  handleOpenInfo() {
    this.setState({ currentPage: PAGE_INFO });
  }

  handleLogout() {
    Auth.deauthenticateUser();
    User.clear();
    this.isUserAuthenticated();
  }

  handleRequestCloseSnakbar() {
    this.setState({
      showSnakbar: false,
    });
  };

  // *** RENDER

  render() {
    const isSupport = User.isSupport();
    const isAdmin = User.isAdmin();
    const isUser = User.isUser();

    return (
      <div>
        <AppBar
          title="Atom"
          showMenuIconButton={this.state.userAuthenticated}
          onLeftIconButtonTouchTap={this.handleToggleSideMenu}
        />

        <Drawer open={this.state.openedSideMenu}>
          <AppBar
            title="Atom"
            iconElementLeft={<IconButton><IconNavigationClose /></IconButton>}
            onLeftIconButtonTouchTap={this.handleToggleSideMenu}
          />

          <MenuItem leftIcon={<IconDashboard />} onTouchTap={this.handleOpenConfiguration}>Configuration</MenuItem>
          { isSupport && <MenuItem leftIcon={<IconCode />} onTouchTap={this.handleOpenEditor}>Editor</MenuItem> }
          { !isUser && <MenuItem leftIcon={<IconSettings />} onTouchTap={this.handleOpenSettings}>Settings</MenuItem> }
          <MenuItem leftIcon={<IconInfo />} onTouchTap={this.handleOpenInfo}>Information</MenuItem>
          <MenuItem leftIcon={<IconLogout />} onTouchTap={this.handleLogout}>Logout</MenuItem>

          {/* TODO: link to PRINCIP main page */}
        </Drawer>

        <Snackbar
          open={this.state.showSnakbar}
          message={this.state.messageSnakbar}
          autoHideDuration={4000}
          onRequestClose={this.toogleSnakbar}
          action="Close"
          onActionTouchTap={this.handleRequestCloseSnakbar}
        />

        { this.state.userAuthenticated ?
          (this.state.currentPage === PAGE_INFO) ? (<InfoPage />) : (<SettingsPage handleLogout={this.handleLogout} />) :
          (<LoginPage
            onLogin={this.isUserAuthenticated}
            toogleSnakbar={this.toogleSnakbar}
          />)
        }

      </div>
    );
  }
}
