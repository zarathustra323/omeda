const build = require('../../schema/utils/build');
const schema = require('../../schema/customer/behavior-elements');

class CustomerBehaviorEntity {
  constructor(obj) {
    Object.assign(this, build({ schema, obj }));
  }
}

module.exports = CustomerBehaviorEntity;
