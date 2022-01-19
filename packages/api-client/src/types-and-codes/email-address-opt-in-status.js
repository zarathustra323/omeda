const StringCode = require('./string-code');

const map = {
  IN: 'Opted-In',
  OUT: 'Opted-Out',
};

class EmailAddressOptInStatus extends StringCode {
  constructor(value) {
    super({ map, value });
  }
}

module.exports = EmailAddressOptInStatus;
