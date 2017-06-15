import { encrypt, decrypt } from './Crypto';

const ROLE_SUPPORT = 'support';
const ROLE_ADMIN = 'admin';
const ROLE_USER = 'user';

const isUserHasRole = (role) => {
  let user = localStorage.getItem('user');
  if (user) {
    user = JSON.parse(decrypt(user));
    return user.role === role;
  } else {
    return false;
  }
}

class User {
  static init(args) {
    const argsString = JSON.stringify(args);
    localStorage.setItem('user', encrypt(argsString));
  }

  static getName() {
    return this.name;
  }

  static isSupport() {
    return isUserHasRole(ROLE_SUPPORT);
  }

  static isAdmin() {
    return isUserHasRole(ROLE_ADMIN);
  }

  static isUser() {
    return isUserHasRole(ROLE_USER);
  }

  static clear() {
    localStorage.removeItem('user');
  }
}

export default User;
