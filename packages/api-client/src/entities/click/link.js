const { asArray } = require('@parameter1/utils');
const build = require('../../schema/utils/build');
const schema = require('../../schema/click/link-elements');

const ClickEntity = require('./click');

const builder = ({ name, value }) => {
  if (name === 'Clicks') {
    return asArray(value).map((obj) => new ClickEntity(obj));
  }
  return null;
};

class LinkClickEntity {
  constructor(obj) {
    Object.assign(this, build({ schema, obj, builder }));
  }
}

module.exports = LinkClickEntity;
