const IntegerCode = require('./integer-code');

const map = {
  0: 'Type Not Known',
  200: 'Business Phone',
  210: 'Home Phone',
  230: 'Mobile Phone',
  240: 'Fax',
  250: 'Foreign Phone',
  260: 'Foreign Fax',
  270: 'Pager',
};

class PhoneContactType extends IntegerCode {
  constructor(value) {
    super({ map, value, def: 0 });
  }
}

module.exports = PhoneContactType;
