const IntegerCode = require('../integer-code');

const map = {
  0: 'Not Auto Renewal',
  5: 'Auto Charge',
  6: 'Auto Bill Me on Invoice',
};

class SubscriptionAutoRenewalCode extends IntegerCode {
  constructor(value) {
    super({ map, value });
  }
}

module.exports = SubscriptionAutoRenewalCode;
