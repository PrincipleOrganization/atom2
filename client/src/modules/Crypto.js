import crypto from 'crypto';

const CRYPTO_ALGORITM = 'aes-256-ctr';
const CRYPTO_PASSWORD = 'jhsg724q3wex!jKIUN8q9c_89';

const encrypt = (text) => {
  var cipher = crypto.createCipher(CRYPTO_ALGORITM, CRYPTO_PASSWORD);
  var crypted = cipher.update(text, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}

const decrypt = (text) => {
  var decipher = crypto.createDecipher(CRYPTO_ALGORITM, CRYPTO_PASSWORD);
  var dec = decipher.update(text, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
}

export { encrypt, decrypt};
