class StringCodeType {
  constructor({ map, value, def = null } = {}) {
    const values = Object.keys(map).map((code) => `${code}`.trim());
    const v = `${value}`.trim();
    this.Value = values.includes(v) ? v : def;
    this.Description = map[this.Value];
  }
}

module.exports = StringCodeType;
