const IntegerCode = require('./integer-code');

const map = {
  0: 'Type Not Known',
  300: 'Primary (Business) Email Address',
  310: 'Secondary (Home) Email Address',
};

class EmailContactType extends IntegerCode {
  constructor(value) {
    super({ map, value, def: 0 });
  }
}

module.exports = EmailContactType;
