const AddressContactType = require('./address-contact-type');
const AddressStatusCode = require('./address-status-code');
const DemographicType = require('./demographic-type');
const DemographicValueType = require('./demographic-value-type');
const EmailContactType = require('./email-contact-type');
const EmailStatusCode = require('./email-status-code');
const PhoneContactType = require('./phone-contact-type');

const customer = require('./customer');
const subscriptions = require('./subscriptions');

module.exports = {
  AddressContactType,
  AddressStatusCode,
  DemographicType,
  DemographicValueType,
  EmailContactType,
  EmailStatusCode,
  PhoneContactType,
  ...customer,
  ...subscriptions,
};
