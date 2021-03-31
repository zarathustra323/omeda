const IntegerCode = require('../integer-code');

const map = {
  1: 'Active',
  2: 'Pending',
  3: 'Expired',
  4: 'Cancelled',
  5: 'Graced',
  6: 'Standing Order',
};

class SubscriptionStatusCode extends IntegerCode {
  constructor(value) {
    super({ map, value });
  }
}

module.exports = SubscriptionStatusCode;
