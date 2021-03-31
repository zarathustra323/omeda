const IntegerCode = require('../integer-code');

const map = {
  1: 'Active',
  2: 'Active Non-Qualified',
  3: 'Qualified Reserve',
  8: 'Soft controlled kills',
  9: 'Controlled kills',
  10: 'ACS kills (Address Correction Service)',
  20: 'Expire suspends',
  21: 'Future starts',
  22: 'Postal suspends',
  23: 'Credit Suspends',
  24: 'Requested Suspends',
  25: 'Kill/Refunds',
  50: 'Passalong',
};

class SubscriptionMarketingClassCode extends IntegerCode {
  constructor(value) {
    super({ map, value });
  }
}

module.exports = SubscriptionMarketingClassCode;
