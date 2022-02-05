const dayjs = require('../dayjs');

// some dates include the "CDT" or "CST" suffix, kill them with fire :)
const removePatterns = [
  /cdt$/i,
  /cst$/i,
];

module.exports = (value) => {
  if (!value) return null;
  let v = value;

  removePatterns.forEach((pattern) => {
    if (pattern.test(v)) v = v.replace(pattern, '').trim();
  });

  const date = dayjs.tz(v, 'America/Chicago');
  return date.isValid(date) ? date : null;
};
