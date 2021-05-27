const { asArray } = require('@parameter1/utils');
const build = require('../../schema/utils/build');
const schema = require('../../schema/deployment/elements.js');

const EmailDeploymentModificationHistoryEntity = require('./modification-history');
const EmailDeploymentSplitEntity = require('./split');
const EmailDeploymentLinkTrackingEntity = require('./link-tracking');
const EmailDeploymentTesterEntity = require('./tester');

const builder = ({ name, value }) => {
  if (name === 'ModificationHistory') {
    return asArray(value).map((obj) => new EmailDeploymentModificationHistoryEntity(obj));
  }
  if (name === 'Splits') {
    return asArray(value).map((obj) => new EmailDeploymentSplitEntity(obj));
  }
  if (name === 'LinkTracking') {
    return asArray(value).map((obj) => new EmailDeploymentLinkTrackingEntity(obj));
  }
  if (name === 'Testers') {
    return asArray(value).map((obj) => new EmailDeploymentTesterEntity(obj));
  }
  return null;
};

class EmailDeploymentEntity {
  constructor(obj) {
    Object.assign(this, build({ schema, obj, builder }));
  }
}

module.exports = EmailDeploymentEntity;
