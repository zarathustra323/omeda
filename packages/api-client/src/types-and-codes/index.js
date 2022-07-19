const AddressContactType = require('./address-contact-type');
const ContactTypeStatusCode = require('./contact-type-status-code');
const DemographicType = require('./demographic-type');
const DemographicValueType = require('./demographic-value-type');
const EmailAddressOptInStatus = require('./email-address-opt-in-status');
const EmailContactType = require('./email-contact-type');
const PhoneContactType = require('./phone-contact-type');
const WebformViewCode = require('./webform-view-code');

const behavior = require('./behavior');
const customer = require('./customer');
const deployment = require('./deployment');
const deploymentType = require('./deployment-type');
const product = require('./product');
const subscriptions = require('./subscriptions');

module.exports = {
  AddressContactType,
  ContactTypeStatusCode,
  DemographicType,
  DemographicValueType,
  EmailAddressOptInStatus,
  EmailContactType,
  PhoneContactType,
  WebformViewCode,
  ...behavior,
  ...customer,
  ...deployment,
  ...deploymentType,
  ...product,
  ...subscriptions,
};
