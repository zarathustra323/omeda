const IntegerCode = require('./integer-code');

const map = {
  0: 'Standard Choice: Type indicating a single-choice-allowed type of question. (Two or more choices – one answers).',
  3: 'None-of-the-above Choice: None-of-the-above choice value type. A type of standard choice whose selection may force some special validation.',
  4: '‘Other’ Choice: This value type will represent the “Other” option ( Open ended Coding ).',
};

class DemographicValueType extends IntegerCode {
  constructor(value) {
    super({ map, value });
  }
}

module.exports = DemographicValueType;
