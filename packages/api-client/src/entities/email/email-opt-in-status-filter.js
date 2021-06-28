const build = require('../../schema/utils/build');
const schema = require('../../schema/email/opt-in-filter-elements');

class EmailOptInStatusFilterEntity {
  constructor(obj) {
    Object.assign(this, build({ schema, obj }));
  }
}

module.exports = EmailOptInStatusFilterEntity;
