const IntegerCode = require('../integer-code');

const map = {
  1: 'Installment Bill Me',
  2: 'Installment Auto Charge',
};

class SubscriptionInstallmentBillingCode extends IntegerCode {
  constructor(value) {
    super({ map, value });
  }
}

module.exports = SubscriptionInstallmentBillingCode;
