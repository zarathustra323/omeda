const build = require('../../schema/utils/build');
const schema = require('../../schema/customer/phone-elements');

class CustomerPhoneEntity {
  constructor(obj) {
    Object.assign(this, build({ schema, obj }));
  }
}

module.exports = CustomerPhoneEntity;
