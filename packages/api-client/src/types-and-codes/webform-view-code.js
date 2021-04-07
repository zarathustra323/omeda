const IntegerCode = require('./integer-code');

const map = {
  0: 'Hidden',
  1: 'Required',
  2: 'Optional',
};

class WebformViewCode extends IntegerCode {
  constructor(value) {
    super({ map, value });
  }
}

module.exports = WebformViewCode;
