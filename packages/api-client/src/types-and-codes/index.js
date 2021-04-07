const AddressContactType = require('./address-contact-type');
const DemographicType = require('./demographic-type');
const DemographicValueType = require('./demographic-value-type');
const EmailContactType = require('./email-contact-type');
const PhoneContactType = require('./phone-contact-type');

const customer = require('./customer');
const subscriptions = require('./subscriptions');

module.exports = {
  AddressContactType,
  DemographicType,
  DemographicValueType,
  EmailContactType,
  PhoneContactType,
  ...customer,
  ...subscriptions,
};
