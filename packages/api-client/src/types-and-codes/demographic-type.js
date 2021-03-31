const IntegerCode = require('./integer-code');

const map = {
  1: 'A single-choice-allowed type of question. (Two or more choices – one answers)',
  2: 'A multiple-choice-allowed type of question. (Two or more choices – many answers)',
  3: 'An open-form short answer question. (No choices – text input)',
  5: 'A yes/no answer',
  6: 'A date answer',
  7: 'A whole number answer',
  8: 'A decimal answer',
};

class DemographicType extends IntegerCode {
  constructor(value) {
    super({ map, value });
  }
}

module.exports = DemographicType;
