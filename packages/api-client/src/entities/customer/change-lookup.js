const build = require('../../schema/utils/build');
const schema = require('../../schema/customer/change-lookup-elements');

class CustomerChangeLookupEntity {
  constructor(obj) {
    Object.assign(this, build({ schema, obj }));
  }
}

module.exports = CustomerChangeLookupEntity;
