const IntegerCode = require('../integer-code');

const map = {
  0: 'Inactive',
  1: 'Active',
};

class BehaviorStatusCode extends IntegerCode {
  constructor(value) {
    super({ map, value });
  }
}

module.exports = {
  BehaviorStatusCode,
};
