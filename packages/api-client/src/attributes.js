const Joi = require('@parameter1/joi');

module.exports = {
  behaviorId: Joi.number().integer().min(1),
  customerId: Joi.number().integer().min(1),
  emailAddress: Joi.string().trim().email(),
  encryptedCustomerId: Joi.string().trim().length(15),
  inputId: Joi.string().trim(),
  productId: Joi.number().integer().min(1),
};
