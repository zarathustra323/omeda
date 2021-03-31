const IntegerCode = require('../integer-code');

const map = {
  0: 'Standard / Not Locked',
  1: 'Locked',
};

class SubscriptionLockCode extends IntegerCode {
  constructor(value) {
    super({ map, value });
  }
}

module.exports = SubscriptionLockCode;
