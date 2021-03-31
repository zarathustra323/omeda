const descriptions = {
  0: 'Type Not Known',
  300: 'Primary (Business) Email Address',
  310: 'Secondary (Home) Email Address',
};

const values = Object.keys(descriptions).map((code) => parseInt(code, 10));

class EmailContactType {
  constructor(value) {
    const v = parseInt(value, 10);
    this.Value = values.includes(v) ? v : 0;
    this.Description = descriptions[this.Value];
  }
}

module.exports = EmailContactType;
