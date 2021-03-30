const descriptions = {
  0: 'Type Not Known',
  200: 'Business Phone',
  210: 'Home Phone',
  230: 'Mobile Phone',
  240: 'Fax',
  250: 'Foreign Phone',
  260: 'Foreign Fax',
  270: 'Pager',
};

const values = Object.keys(descriptions).map((code) => parseInt(code, 10));

class PhoneContactType {
  constructor(value) {
    const v = parseInt(value, 10);
    this.value = values.includes(v) ? v : 0;
    this.description = descriptions[this.value];
  }
}

module.exports = PhoneContactType;
