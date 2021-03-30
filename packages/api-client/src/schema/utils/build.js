const dayjs = require('../../dayjs');
const AddressContactType = require('../../types-and-codes/address-contact-type');
const EmailContactType = require('../../types-and-codes/email-contact-type');
const PhoneContactType = require('../../types-and-codes/phone-contact-type');

module.exports = ({ schema, obj } = {}) => {
  const data = {};
  schema.forEach(({ name, type }) => {
    const value = obj[name];
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
    if (type === 'Integer' || type === 'Short' || type === 'Byte') {
      data[name] = value == null ? null : value;
    }
  });
  return data;
};
