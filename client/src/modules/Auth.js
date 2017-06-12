class Auth {

  /**
   * Authenticate a user. Save a token string in Local Storage
   *
   * @param {string} token
   */
  static authenticateUser(token) {
    document.cookie = `token=${token}`;
  }

  /**
   * Check if a user is authenticated - check if a token is saved in Local Storage
   *
   * @returns {boolean}
   */
  static isUserAuthenticated() {
    if (document.cookie) {
      return !!document.cookie.split('token=')[1];
    } else {
      return false;
    }
  }

  /**
   * Deauthenticate a user. Remove a token from Local Storage.
   *
   */
  static deauthenticateUser() {
    document.cookie = 'token=';
  }

  /**
   * Get a token value.
   *
   * @returns {string}
   */

  static getToken() {
    return document.cookie.split('token=')[0];
  }

}

export default Auth;
