const IntegerCode = require('./integer-code');

const map = {
  0: 'Type Not Known',
  100: 'Business Address',
  110: 'Home Address',
};

class AddressContactType extends IntegerCode {
  constructor(value) {
    super({ map, value, def: 0 });
  }
}

module.exports = AddressContactType;
