module.exports = {
  /**
   *
   */
  Customer: {
    /**
     *
     */
    async demographics({ Id }, _, { loaders }) {
      const response = await loaders.customerDemographics.load(Id);
      return response ? response.data : [];
    },

    /**
     *
     */
    async emailAddresses({ Id }, _, { loaders }) {
      const response = await loaders.customerEmails.load(Id);
      return response ? response.data : [];
    },

    /**
     *
     */
    async externalIds({ Id }, _, { loaders }) {
      const response = await loaders.customerExternalIds.load(Id);
      return response ? response.data : [];
    },

    /**
     *
     */
    async phoneNumbers({ Id }, _, { loaders }) {
      const response = await loaders.customerPhoneNumbers.load(Id);
      return response ? response.data : [];
    },

    /**
     *
     */
    async postalAddresses({ Id }, _, { loaders }) {
      const response = await loaders.customerPostalAddresses.load(Id);
      return response ? response.data : [];
    },

    /**
     *
     */
    async primaryEmailAddress({ Id }, _, { loaders }) {
      const response = await loaders.customerEmails.load(Id);
      return response ? response.getPrimary() : null;
    },

    /**
     *
     */
    async primaryPhoneNumber({ Id }, _, { loaders }) {
      const response = await loaders.customerPhoneNumbers.load(Id);
      return response ? response.getPrimary() : null;
    },

    /**
     *
     */
    async primaryPostalAddress({ Id }, _, { loaders }) {
      const response = await loaders.customerPostalAddresses.load(Id);
      return response ? response.getPrimary() : null;
    },
  },

  /**
   *
   */
  CustomerDemographic: {
    /**
     *
     */
    demographic({ DemographicId }, _, { repos }) {
      return repos.brandDemographic.findById({ id: DemographicId });
    },

    /**
     *
     */
    value({ DemographicId, ValueId }, _, { repos }) {
      if (!DemographicId || !ValueId) return null;
      return repos.brandDemographic.findValueById({
        demographicId: DemographicId,
        valueId: ValueId,
      });
    },
  },

  /**
   *
   */
  RapidCustomerIdentification: {
    /**
     *
     */
    async customer({ CustomerId }, _, { apiClient }) {
      const response = await apiClient.resource('customer').lookupById({
        customerId: CustomerId,
      });
      return response.data;
    },
  },

  /**
   *
   */
  Mutation: {
    /**
     *
     */
    async rapidCustomerIdentification(_, { input }, { apiClient }) {
      const {
        firstName,
        lastName,
        title,
        companyName,
        regionCode,
        countryCode,
        postalCode,
      } = input;

      const hasAddress = companyName || regionCode || countryCode || postalCode;
      const body = {
        RunProcessor: 1,
        Products: [{ OmedaProductId: input.productId }],
        Emails: [{ EmailAddress: input.email }],
        ...(firstName && { FirstName: firstName }),
        ...(lastName && { LastName: lastName }),
        ...(title && { Title: title }),
        ...(hasAddress && {
          Addresses: [
            {
              ...(companyName && { Company: companyName }),
              ...(regionCode && { RegionCode: regionCode }),
              ...(countryCode && { CountryCode: countryCode }),
              ...(postalCode && { PostalCode: postalCode }),
            },
          ],
        }),
      };
      const response = await apiClient.resource('customer').storeCustomerAndOrder({
        body,
        inputId: input.inputId,
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

    /**
     *
     */
    async customersByEmailAddress(_, { input }, { apiClient }) {
      const { emailAddress, productId } = input;
      const { data } = await apiClient.resource('customer').lookupByEmailAddress({
        emailAddress,
        productId,
      });
      if (!data.size) return [];
      const customerIds = [...data];
      return Promise.all(customerIds.map(async (customerId) => {
        const response = await apiClient.resource('customer').lookupById({
          customerId,
          reQueryOnInactive: true,
        });
        return response.data;
      }));
    },
  },
};
