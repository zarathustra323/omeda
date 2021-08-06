module.exports = {
  /**
   *
   */
  Demographic: {
    /**
     *
     */
    webform(parent) {
      return parent;
    },
  },

  /**
   *
   */
  DemographicValue: {
    /**
     *
     */
    webform(parent) {
      return parent;
    },
  },

  /**
   *
   */
  Query: {
    /**
     *
     */
    async demographicById(_, { input }, { loaders }) {
      const { id } = input;
      const r = await loaders.brandDemographics.load(id);
      return r ? r.data : null;
    },
  },
};
