const dayjs = require('../../dayjs');
const AddressContactType = require('../../types-and-codes/address-contact-type');
const DemographicType = require('../../types-and-codes/demographic-type');
const EmailContactType = require('../../types-and-codes/email-contact-type');
const PhoneContactType = require('../../types-and-codes/phone-contact-type');

module.exports = ({ schema, obj } = {}) => {
  const data = {};
  schema.forEach(({ name, type }) => {
    const value = obj[name];

    // enums (codes & types)
    if (schema.type === 'customer-demographic-elements' && name === 'DemographicType') {
      data[name] = new DemographicType(value);
      return;
    }
    if (schema.type === 'customer-email-elements' && name === 'EmailContactType') {
      data[name] = new EmailContactType(value);
      return;
    }
    if (schema.type === 'customer-address-elements' && name === 'AddressContactType') {
      data[name] = new AddressContactType(value);
      return;
    }
    if (schema.type === 'customer-phone-elements' && name === 'PhoneContactType') {
      data[name] = new PhoneContactType(value);
      return;
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
    if (type === 'array') {
      data[name] = Array.isArray(value) ? value : [];
      return;
    }
    throw new TypeError(`An unknown Omeda data type was encountered: '${type}'`);
  });
  return data;
};
