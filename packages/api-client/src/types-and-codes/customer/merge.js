const IntegerCode = require('../integer-code');

const map = {
  0: 'Non-Mergeable',
  1: 'Mergeable',
};

class CustomerMergeCode extends IntegerCode {
  constructor(value) {
    super({ map, value });
  }
}

module.exports = CustomerMergeCode;
