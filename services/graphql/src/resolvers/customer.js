module.exports = {
  /**
   *
   */
  Customer: {
    /**
     *
     */
    async postalAddresses({ Id }, _, { apiClient }) {
      const response = await apiClient.resource('customer').lookupPostalAddresses({
        customerId: Id,
        errorOnNotFound: false,
      });
      return response.data;
    },
  },

  /**
   *
   */
  Query: {
    /**
     *
     */
    async customerById(_, { input }, { apiClient }) {
      const { id, reQueryOnInactive } = input;
      const response = await apiClient.resource('customer').lookupById({
        customerId: id,
        reQueryOnInactive,
      });
      return response.data;
    },

    /**
     *
     */
    async customerByEncyptedId(_, { input }, { apiClient }) {
      const { id } = input;
      const response = await apiClient.resource('customer').lookupByEncryptedId({
        encryptedId: id,
      });
      return response.data;
    },
  },
};
