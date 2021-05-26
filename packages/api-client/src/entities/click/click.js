const build = require('../../schema/utils/build');
const schema = require('../../schema/click/click-elements');

class ClickEntity {
  constructor(obj) {
    Object.assign(this, build({ schema, obj }));
  }
}

module.exports = ClickEntity;
