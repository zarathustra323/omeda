const { asArray } = require('@parameter1/utils');
const build = require('../../schema/utils/build');
const schema = require('../../schema/click/deployment-elements');

const SplitClickEntity = require('./split');

const builder = ({ name, value }) => {
  if (name === 'splits') {
    return asArray(value).map((obj) => new SplitClickEntity(obj));
  }
  return null;
};

class DeploymentClickEntity {
  constructor(obj) {
    Object.assign(this, build({ schema, obj, builder }));
  }
}

module.exports = DeploymentClickEntity;
