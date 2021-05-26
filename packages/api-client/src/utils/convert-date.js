const dayjs = require('../dayjs');

module.exports = (value) => {
  if (!value) return null;
  const date = dayjs.tz(value, 'America/Chicago');
  return date.isValid(date) ? date : null;
};
