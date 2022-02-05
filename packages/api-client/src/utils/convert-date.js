const dayjs = require('../dayjs');

module.exports = (value) => {
  if (!value) return null;
  let v = value;
  // some dates include the "CDT" suffix, kill it with fire :)
  if (/cdt$/i.test(v)) v = v.replace(/cdt$/i, '').trim();
  const date = dayjs.tz(v, 'America/Chicago');
  return date.isValid(date) ? date : null;
};
