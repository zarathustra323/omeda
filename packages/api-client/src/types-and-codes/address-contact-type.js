const descriptions = {
  0: 'Type Not Known',
  100: 'Business Address',
  110: 'Home Address',
};

const values = Object.keys(descriptions).map((code) => parseInt(code, 10));

class AddressContactType {
  constructor(value) {
    const v = parseInt(value, 10);
    this.value = values.includes(v) ? v : 0;
    this.description = descriptions[this.value];
  }
}

module.exports = AddressContactType;
