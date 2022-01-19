const build = require('../../../schema/utils/build');
const schema = require('../../../schema/brand/product/issue-elements');

class BrandProductIssueEntity {
  constructor(obj) {
    Object.assign(this, build({ schema, obj }));
  }
}

module.exports = BrandProductIssueEntity;
