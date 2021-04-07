const IntegerCode = require('./integer-code');

const map = {
  1: 'Primary',
  2: 'Active',
};

class ContactTypeStatusCode extends IntegerCode {
  constructor(value) {
    super({ map, value });
  }
}

module.exports = ContactTypeStatusCode;
