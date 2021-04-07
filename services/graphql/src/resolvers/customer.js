module.exports = {
  /**
   *
   */
  Customer: {
    /**
     *
     */
    async emailAddresses({ Id }, _, { apiClient }) {
      const response = await apiClient.resource('customer').lookupEmails({
        customerId: Id,
        errorOnNotFound: false,
      });
      return response.data;
    },

    /**
     *
     */
    async externalIds({ Id }, _, { apiClient }) {
      const response = await apiClient.resource('customer').lookupExternalIds({
        customerId: Id,
        errorOnNotFound: false,
      });
      return response.data;
    },

    /**
     *
     */
    async phoneNumbers({ Id }, _, { apiClient }) {
      const response = await apiClient.resource('customer').lookupPhoneNumbers({
        customerId: Id,
        errorOnNotFound: false,
      });
      return response.data;
    },

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
