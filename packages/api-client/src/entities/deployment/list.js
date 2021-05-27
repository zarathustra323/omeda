const build = require('../../schema/utils/build');
const schema = require('../../schema/deployment/list-elements');

const builder = ({ name, value }) => {
  if (name === 'Status') {
    return value.split('_').map((s) => {
      const lowered = s.toLowerCase();
      return `${lowered.charAt(0).toUpperCase()}${lowered.slice(1)}`;
    }).join(' ');
  }
  return null;
};

class DeploymentListEntity {
  constructor(obj) {
    Object.assign(this, build({ schema, obj, builder }));
  }
}

module.exports = DeploymentListEntity;
