const dayjs = require('../../dayjs');

module.exports = ({ schema, obj } = {}) => {
  const data = {};
  schema.forEach(({ name, type }) => {
    const value = obj[name];
    if (type === 'DateTime') {
      const date = value ? dayjs.tz(value, 'America/Chicago') : null;
      data[name] = date && date.isValid() ? date.toDate() : null;
      return;
    }
    if (type === 'String') {
      const trimmed = value ? `${value}`.trim() : null;
      data[name] = trimmed || null;
      return;
    }
    if (type === 'Integer' || type === 'Short') {
      data[name] = value == null ? null : value;
    }
  });
  return data;
};
