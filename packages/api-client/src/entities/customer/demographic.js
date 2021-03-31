const build = require('../../schema/utils/build');
const schema = require('../../schema/customer/demographic-elements');
const DemographicType = require('../../types-and-codes/demographic-type');

const builder = ({ name, value }) => {
  if (name !== 'DemographicType') return null;
  return new DemographicType(value);
};

class CustomerDemographicEntity {
  constructor(obj) {
    Object.assign(this, build({ schema, obj, builder }));
  }
}

module.exports = CustomerDemographicEntity;
