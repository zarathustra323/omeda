const StringCode = require('../string-code');

const map = {
  P: 'Print',
  D: 'Digital',
  B: 'Both',
};

class SubscriptionVersionCode extends StringCode {
  constructor(value) {
    super({ map, value });
  }
}

module.exports = SubscriptionVersionCode;
