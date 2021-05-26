const { asArray } = require('@parameter1/utils');
const build = require('../../schema/utils/build');
const schema = require('../../schema/click/split-elements');

const LinkClickEntity = require('./link');

const builder = ({ name, value }) => {
  if (name === 'Links') {
    return asArray(value).map((obj) => new LinkClickEntity(obj));
  }
  return null;
};

class SplitClickEntity {
  constructor(obj) {
    Object.assign(this, build({ schema, obj, builder }));
  }
}

module.exports = SplitClickEntity;
