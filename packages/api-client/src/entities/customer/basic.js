const build = require('../../schema/utils/build');
const schema = require('../../schema/customer/basic-elements');

class BasicCustomerEntity {
  constructor(obj) {
    Object.assign(this, build({ schema, obj }));
  }
}

module.exports = BasicCustomerEntity;
