const Joi = require('@parameter1/joi');
const { validateAsync } = require('@parameter1/joi/utils');
const OmedaRepo = require('./abstract');

class EmailDeploymentRepo extends OmedaRepo {
  /**
   *
   */
  constructor({ brandKey, client, dbName } = {}) {
    super({
      brandKey,
      name: 'email deployment',
      collectionName: 'email-deployments',
      dbName,
      client,
    });
  }

  /**
   *
   * @param {object} params
   * @param {object[]} params.emailDeployments The deployment types to upsert.
   */
  async bulkUpsert(params = {}) {
    const { emailDeployments } = await validateAsync(Joi.object({
      emailDeployments: Joi.array().items(Joi.object().required()).required(),
    }).required(), params);

    const { brandKey: brand } = this;
    const now = new Date();
    const ids = [];
    const operations = emailDeployments.map((emailDeployment) => {
      const { TrackId } = emailDeployment;
      ids.push(TrackId);
      const filter = { brand, 'data.TrackId': TrackId };
      const update = {
        $setOnInsert: { brand, createdAt: now },
        $set: { data: emailDeployment, updatedAt: now },
      };
      return { updateOne: { filter, update, upsert: true } };
    });

    return this.bulkWrite({ operations });
  }
}

module.exports = EmailDeploymentRepo;
