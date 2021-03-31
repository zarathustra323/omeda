const build = require('../../schema/utils/build');
const schema = require('../../schema/customer/subscription-elements');

class CustomerSubscriptionEntity {
  constructor(obj) {
    Object.assign(this, build({ schema, obj }));
  }
}

module.exports = CustomerSubscriptionEntity;
