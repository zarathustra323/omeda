const build = require('../../schema/utils/build');
const schema = require('../../schema/customer/address-elements');
const AddressContactType = require('../../types-and-codes/address-contact-type');

const builder = ({ name, value }) => {
  if (name !== 'AddressContactType') return null;
  return new AddressContactType(value);
};

class CustomerPostalAddressEntity {
  constructor(obj) {
    Object.assign(this, build({ schema, obj, builder }));
  }
}

module.exports = CustomerPostalAddressEntity;
