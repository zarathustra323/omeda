const IntegerCode = require('./integer-code');

const map = {
  1: 'Primary Address',
  2: 'Active Address',
};

class AddressStatusCode extends IntegerCode {
  constructor(value) {
    super({ map, value, def: 0 });
  }
}

module.exports = AddressStatusCode;
