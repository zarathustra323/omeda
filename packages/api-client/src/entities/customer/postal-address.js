const build = require('../../schema/utils/build');
const schema = require('../../schema/customer/address-elements');

class CustomerAddressEntity {
  constructor(obj) {
    Object.assign(this, build({ schema, obj }));
  }
}

module.exports = CustomerAddressEntity;
