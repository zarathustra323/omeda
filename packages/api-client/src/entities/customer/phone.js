const build = require('../../schema/utils/build');
const schema = require('../../schema/customer/phone-elements');
const PhoneContactType = require('../../types-and-codes/phone-contact-type');

const builder = ({ name, value }) => {
  if (name !== 'PhoneContactType') return null;
  return new PhoneContactType(value);
};

class CustomerPhoneEntity {
  constructor(obj) {
    Object.assign(this, build({ schema, obj, builder }));
  }
}

module.exports = CustomerPhoneEntity;
