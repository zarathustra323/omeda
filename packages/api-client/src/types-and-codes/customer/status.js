const IntegerCode = require('../integer-code');

const map = {
  0: 'Deleted / Inactive',
  1: 'Active',
  2: 'Prospect',
};

class CustomerStatusCode extends IntegerCode {
  constructor(value) {
    super({ map, value });
  }
}

module.exports = CustomerStatusCode;
