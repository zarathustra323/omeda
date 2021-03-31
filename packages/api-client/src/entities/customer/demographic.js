const build = require('../../schema/utils/build');
const schema = require('../../schema/customer/demographic-elements');

class CustomerDemographicEntity {
  constructor(obj) {
    Object.assign(this, build({ schema, obj }));
  }
}

module.exports = CustomerDemographicEntity;
