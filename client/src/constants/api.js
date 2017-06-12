import axios from 'axios';

const LOCATION_AUTH_LOGIN = '/auth/login';
const LOCATION_EDITOR = '/api/editor';
const LOCATION_DASHBOARD = '/api/platform/ui';
const LOCATION_SETTINGS = '/api/settings';
const LOCATION_INFO = '/api/info';
const LOCATION_PLATFORM_INFO = '/api/platform/info';

axios.defaults.baseURL = location.origin;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

class API {
  authLogin(args) {
    try {
      return axios.post(LOCATION_AUTH_LOGIN, args);
    } catch(e) {
      throw e;
    }
  }

  openEditor() {
    window.location = LOCATION_EDITOR;
  }

  openDashboard() {
    window.location = LOCATION_DASHBOARD;
  }

  getSettings() {
    return axios.get(LOCATION_SETTINGS);
  }

  setSettings(args) {
    return axios.put(LOCATION_SETTINGS, args);
  }

  getInfo() {
    return axios.get(LOCATION_INFO);
  }

  getPlatformInfo() {
    return axios.get(LOCATION_PLATFORM_INFO);
  }
 }

export default new API();
