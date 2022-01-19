const StringCode = require('../string-code');

const map = {
  DY: 'Daily',
  WK: 'Weekly',
  MO: 'Monthly',
  YR: 'Yearly',
  BIW: 'Bi-Weekly',
  BIM: 'Bi-Monthly',
  MA: 'Manual',
};

class ProductFrequencyType extends StringCode {
  constructor(value) {
    super({ map, value });
  }
}

module.exports = ProductFrequencyType;
