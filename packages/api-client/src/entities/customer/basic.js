const build = require('../../schema/utils/build');
const schema = require('../../schema/basic-customer-elements');

class BasicCustomerEntity {
  constructor(obj) {
    Object.assign(this, build({ schema, obj }));
  }
}

module.exports = BasicCustomerEntity;
