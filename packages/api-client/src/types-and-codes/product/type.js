const IntegerCode = require('../integer-code');

const map = {
  1: 'Magazine',
  2: 'Newsletter',
  3: 'Event',
  4: 'Catalog',
  5: 'Email Deployment',
  6: 'Association Membership',
  7: 'Website',
  8: 'Newsstand',
  9: 'Accounting',
  10: 'Sales',
};

class ProductType extends IntegerCode {
  constructor(value) {
    super({ map, value });
  }
}

module.exports = ProductType;
