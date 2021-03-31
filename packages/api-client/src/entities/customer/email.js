const build = require('../../schema/utils/build');
const schema = require('../../schema/customer/email-elements');
const EmailContactType = require('../../types-and-codes/email-contact-type');

const builder = ({ name, value }) => {
  if (name !== 'EmailContactType') return null;
  return new EmailContactType(value);
};

class CustomerEmailEntity {
  constructor(obj) {
    Object.assign(this, build({ schema, obj, builder }));
  }
}

module.exports = CustomerEmailEntity;
