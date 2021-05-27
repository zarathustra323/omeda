const build = require('../../schema/utils/build');
const schema = require('../../schema/deployment/link-tracking-elements');

class EmailDeploymentLinkTrackingEntity {
  constructor(obj) {
    Object.assign(this, build({ schema, obj }));
  }
}

module.exports = EmailDeploymentLinkTrackingEntity;
