const StringCode = require('../../string-code');

const map = [
  'Active',
  'Inactive',
].reduce((o, k) => ({ ...o, [k]: k.toUpperCase().replace(' ', '_') }), {});

class ProductMarketingClassStatus extends StringCode {
  constructor(value) {
    super({ map, value });
  }
}

module.exports = ProductMarketingClassStatus;
