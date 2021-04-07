const IntegerCode = require('./integer-code');

const map = {
  1: 'Primary Email Address',
  2: 'Active Email Address',
};

class EmailStatusCode extends IntegerCode {
  constructor(value) {
    super({ map, value, def: 0 });
  }
}

module.exports = EmailStatusCode;
