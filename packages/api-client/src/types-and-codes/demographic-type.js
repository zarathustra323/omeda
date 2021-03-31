const descriptions = {
  1: 'A single-choice-allowed type of question. (Two or more choices – one answers)',
  2: 'A multiple-choice-allowed type of question. (Two or more choices – many answers)',
  3: 'An open-form short answer question. (No choices – text input)',
  5: 'A yes/no answer',
  6: 'A date answer',
  7: 'A whole number answer',
  8: 'A decimal answer',
};

const values = Object.keys(descriptions).map((code) => parseInt(code, 10));

class DemographicType {
  constructor(value) {
    const v = parseInt(value, 10);
    this.Value = values.includes(v) ? v : 0;
    this.Description = descriptions[this.Value];
  }
}

module.exports = DemographicType;
