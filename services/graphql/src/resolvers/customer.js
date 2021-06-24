const { getAsArray } = require('@parameter1/utils');

module.exports = {
  /**
   *
   */
  Customer: {
    /**
     *
     */
    async companyName({ Id }, _, { loaders }) {
      const response = await loaders.customerPostalAddresses.load(Id);
      return response ? response.getCompanyName() : null;
    },

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

    /**
     *
     */
    async subscriptions({ Id }, _, { loaders }) {
      const response = await loaders.customerSubscriptions.load(Id);
      return response ? response.data : [];
    },
  },

  /**
   *
   */
  CustomerDemographic: {
    /**
     *
     */
    async demographic({ DemographicId }, _, { loaders }) {
      const r = await loaders.brandDemographics.load(DemographicId);
      return r ? r.data : null;
    },

    /**
     *
     */
    async value({ DemographicId, ValueId }, _, { loaders }) {
      const r = await loaders.brandDemographics.load(DemographicId);
      const values = getAsArray(r, 'data.DemographicValues');
      return values.find((value) => value.Id === ValueId);
    },
  },

  /**
   *
   */
  CustomerSubscription: {
    /**
     *
     */
    async product({ ProductId }, _, { loaders }) {
      const r = await loaders.brandProducts.load(ProductId);
      return r ? r.data : null;
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
    async rapidCustomerIdentification(_, { input }, { apiClient, repos }) {
      const {
        email,
        firstName,
        lastName,
        title,
        companyName,
        regionCode,
        countryCode,
        postalCode,
      } = input;

      const Products = [{ OmedaProductId: input.productId }];

      const deploymentTypeIds = [...new Set(input.deploymentTypeIds)];
      const newsletterProductIds = await (async () => {
        if (!deploymentTypeIds.length) return [];
        return repos.brandProduct.distinct({
          key: 'data.Id',
          query: {
            'data.DeploymentTypeId': { $in: deploymentTypeIds },
            'data.ProductType': 2, // only newsletters can be subscribed to in this manner
          },
        });
      })();
      Products.push(...newsletterProductIds.map((id) => ({ OmedaProductId: id })));

      const hasAddress = companyName || regionCode || countryCode || postalCode;
      const body = {
        RunProcessor: 1,
        Products,
        Emails: [{ EmailAddress: email }],
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
      const [response] = await Promise.all([
        apiClient.resource('customer').storeCustomerAndOrder({
          body,
          inputId: input.inputId,
        }),
        (async () => {
          if (!deploymentTypeIds.length) return null;
          return apiClient.resource('email').optInEmailAddress({
            emailAddress: email,
            deploymentTypeIds,
            deleteOptOut: true,
          });
        })(),
      ]);
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
