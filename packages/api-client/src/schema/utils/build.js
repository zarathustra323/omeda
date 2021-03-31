const dayjs = require('../../dayjs');

module.exports = ({ schema, obj, builder } = {}) => {
  const data = {};
  schema.forEach(({ name, type }) => {
    const value = obj[name];

    // if a builder function is present, it should either return a value or null/undefined.
    // if null, the schema builder will continue to handle the value, otherwise will
    // use the value provided by the hook function
    if (builder && typeof builder === 'function') {
      const built = builder({ name, type, value });
      if (built != null) {
        data[name] = built;
        return;
      }
    }

    // links (skip)
    if (type === 'link') return;

    // dates
    if (['datetime', 'date'].includes(type)) {
      const date = value ? dayjs.tz(value, 'America/Chicago') : null;
      data[name] = date && date.isValid() ? date.toDate() : null;
      return;
    }
    // strings
    if (type === 'string') {
      const trimmed = value ? `${value}`.trim() : null;
      data[name] = trimmed || null;
      return;
    }
    // booleans
    if (['boolean', 'short (boolean)'].includes(type)) {
      data[name] = value == null ? null : Boolean(value);
      return;
    }
    // integers
    if (['integer', 'short', 'byte', 'int'].includes(type)) {
      data[name] = value == null ? null : parseInt(value, 10);
      return;
    }
    // floats
    if (['decimal', 'long'].includes(type)) {
      data[name] = value == null ? null : Number(value);
      return;
    }
    // arrays
    if (['array', 'list'].includes(type)) {
      data[name] = Array.isArray(value) ? value : [];
      return;
    }
    throw new TypeError(`An unknown Omeda data type was encountered: '${type}'`);
  });
  return data;
};
