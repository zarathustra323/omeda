class IntegerCodeType {
  constructor({ map, value, def = null } = {}) {
    const values = Object.keys(map).map((code) => parseInt(code, 10));
    const v = parseInt(value, 10);
    this.Value = values.includes(v) ? v : def;
    this.Description = map[this.Value];
  }
}

module.exports = IntegerCodeType;
