const build = require('../../schema/utils/build');
const schema = require('../../schema/customer/external-id-elements');

class CustomerExternalIdEntity {
  constructor(obj) {
    Object.assign(this, build({ schema, obj }));
  }
}

module.exports = CustomerExternalIdEntity;
