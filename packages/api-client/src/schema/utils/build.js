const dayjs = require('../../dayjs');
const AddressContactType = require('../../types-and-codes/address-contact-type');
const DemographicType = require('../../types-and-codes/demographic-type');
const EmailContactType = require('../../types-and-codes/email-contact-type');
const PhoneContactType = require('../../types-and-codes/phone-contact-type');

const SubscriptionAutoRenewalCode = require('../../types-and-codes/subscriptions/auto-renewal.js');
const SubscriptionInstallmentBillingCode = require('../../types-and-codes/subscriptions/installment-billing.js');
const SubscriptionLockCode = require('../../types-and-codes/subscriptions/lock.js');
const SubscriptionMarketingClassCode = require('../../types-and-codes/subscriptions/marketing-class.js');
const SubscriptionPaymentStatusCode = require('../../types-and-codes/subscriptions/payment-status.js');
const SubscriptionStatusCode = require('../../types-and-codes/subscriptions/status.js');
const SubscriptionVersionCode = require('../../types-and-codes/subscriptions/version.js');

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

    // subscription enums (codes)
    if (schema.type === 'customer-subscription-elements') {
      if (['RequestedVersion', 'RequestedVersionCode', 'ActualVersionCode'].includes(name)) {
        data[name] = new SubscriptionVersionCode(value);
        return;
      }
      if (name === 'DataLockCode') {
        data[name] = new SubscriptionLockCode(value);
        return;
      }
      if (name === 'MarketingClassId') {
        data[name] = new SubscriptionMarketingClassCode(value);
        return;
      }
      if (name === 'PaymentStatus') {
        data[name] = new SubscriptionPaymentStatusCode(value);
        return;
      }
      if (name === 'AutoRenewalCode') {
        data[name] = new SubscriptionAutoRenewalCode(value);
        return;
      }
      if (name === 'InstallmentCode') {
        data[name] = new SubscriptionInstallmentBillingCode(value);
        return;
      }
      if (name === 'Status') {
        data[name] = new SubscriptionStatusCode(value);
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
    if (type === 'array') {
      data[name] = Array.isArray(value) ? value : [];
      return;
    }
    throw new TypeError(`An unknown Omeda data type was encountered: '${type}'`);
  });
  return data;
};
