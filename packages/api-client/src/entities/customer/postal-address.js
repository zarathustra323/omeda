const build = require('../../schema/utils/build');
const schema = require('../../schema/customer/address-elements');

class CustomerPostalAddressEntity {
  constructor(obj) {
    Object.assign(this, build({ schema, obj }));
  }
}

module.exports = CustomerPostalAddressEntity;
