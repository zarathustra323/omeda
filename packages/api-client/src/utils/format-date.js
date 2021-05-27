const convertDate = require('./convert-date');

module.exports = (value, format = 'YYYY-MM-DD HH:mm') => {
  const date = convertDate(value);
  if (!date) return null;
  return date.format(format);
};
