const build = require('../../schema/utils/build');
const schema = require('../../schema/customer/subscription-elements');

const AutoRenewalCode = require('../../types-and-codes/subscriptions/auto-renewal.js');
const InstallmentBillingCode = require('../../types-and-codes/subscriptions/installment-billing.js');
const LockCode = require('../../types-and-codes/subscriptions/lock.js');
const MarketingClassCode = require('../../types-and-codes/subscriptions/marketing-class.js');
const PaymentStatusCode = require('../../types-and-codes/subscriptions/payment-status.js');
const StatusCode = require('../../types-and-codes/subscriptions/status.js');
const VersionCode = require('../../types-and-codes/subscriptions/version.js');

const builder = ({ name, value }) => {
  if (['RequestedVersion', 'RequestedVersionCode', 'ActualVersionCode'].includes(name)) {
    return new VersionCode(value);
  }
  if (name === 'DataLockCode') return new LockCode(value);
  if (name === 'MarketingClassId') return new MarketingClassCode(value);
  if (name === 'PaymentStatus') return new PaymentStatusCode(value);
  if (name === 'AutoRenewalCode') return new AutoRenewalCode(value);
  if (name === 'InstallmentCode') return new InstallmentBillingCode(value);
  if (name === 'Status') return new StatusCode(value);
  return null;
};

class CustomerSubscriptionEntity {
  constructor(obj) {
    Object.assign(this, build({ schema, obj, builder }));
  }
}

module.exports = CustomerSubscriptionEntity;
