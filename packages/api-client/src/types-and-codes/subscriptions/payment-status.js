const IntegerCode = require('../integer-code');

const map = {
  1: 'Paid on invoice',
  2: 'Paid with order',
  3: 'Credit',
  5: 'Grace',
  6: 'Free',
  7: 'Controlled',
  8: 'Free Term',
};

class SubscriptionPaymentStatusCode extends IntegerCode {
  constructor(value) {
    super({ map, value });
  }
}

module.exports = SubscriptionPaymentStatusCode;
