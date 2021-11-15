const { UserInputError } = require('apollo-server-express');
const { get, getAsArray } = require('@parameter1/utils');

module.exports = {
  /**
   *
   */
  ChangedCustomer: {
    /**
     *
     */
    async customer({ Id }, _, { apiClient }) {
      const response = await apiClient.resource('customer').lookupById({
        customerId: Id,
      });
      return response.data;
    },
  },

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
    async demographics({ Id }, { input }, { loaders }) {
      const { demographicIds, demographicTypes } = input;
      const response = await loaders.customerDemographics.load(Id);
      const data = response ? response.data : [];
      const filtered = data.filter((demo) => {
        if (demographicIds.length && !demographicIds.includes(demo.DemographicId)) {
          return false;
        }
        if (demographicTypes.length && !demographicTypes.includes(demo.DemographicType)) {
          return false;
        }
        return true;
      });

      // ensure the demographics still exist within Omeda
      const ids = filtered.map(({ DemographicId }) => DemographicId);
      const found = await loaders.brandDemographics.loadMany(ids);
      const foundMap = found.filter((v) => v).reduce((set, doc) => {
        set.add(doc.data.Id);
        return set;
      }, new Set());
      return filtered.filter(({ DemographicId }) => foundMap.has(DemographicId));
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
    async primaryFaxNumber({ Id }, _, { loaders }) {
      const response = await loaders.customerPhoneNumbers.load(Id);
      return response ? response.getPrimaryFax() : null;
    },

    /**
     *
     */
    async primaryMobileNumber({ Id }, _, { loaders }) {
      const response = await loaders.customerPhoneNumbers.load(Id);
      return response ? response.getPrimaryMobile() : null;
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
  CustomerEmailAddress: {
    /**
     *
     */
    async optInStatus({ EmailAddress }, _, { loaders }) {
      const r = await loaders.emailAddressOptInStatus.load(EmailAddress);
      return r ? r.data : [];
    },
  },

  /**
   *
   */
  CustomerEmailAddressOptInStatus: {
    /**
     *
     */
    async deploymentType({ DeploymentTypeId }, _, { loaders }) {
      const doc = await loaders.brandDeploymentTypes.load(DeploymentTypeId);
      return get(doc, 'data');
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
        phoneNumber,
        mobileNumber,
        faxNumber,
        firstName,
        lastName,
        title,
        companyName,
        streetAddress,
        city,
        regionCode,
        countryCode,
        postalCode,
        demographics,
      } = input;

      const promoCode = input.promoCode ? input.promoCode.trim() : null;
      if (promoCode && promoCode.length > 50) throw new UserInputError('The promo code must be 50 characters or fewer.');
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

      const hasAddress = companyName || regionCode || countryCode || postalCode
        || streetAddress || city;

      const phones = [];
      if (phoneNumber) phones.push({ Number: phoneNumber, PhoneContactType: 200 });
      if (mobileNumber) phones.push({ Number: mobileNumber, PhoneContactType: 230 });
      if (faxNumber) phones.push({ Number: faxNumber, PhoneContactType: 240 });

      const body = {
        RunProcessor: 1,
        Products,
        Emails: [{ EmailAddress: email }],
        ...(phones.length && { Phones: phones }),
        ...(firstName && { FirstName: firstName }),
        ...(lastName && { LastName: lastName }),
        ...(title && { Title: title }),
        ...(hasAddress && {
          Addresses: [
            {
              ...(companyName && { Company: companyName }),
              ...(streetAddress && { Street: streetAddress }),
              ...(city && { City: city }),
              ...(regionCode && { RegionCode: regionCode }),
              ...(countryCode && { CountryCode: countryCode }),
              ...(postalCode && { PostalCode: postalCode }),
            },
          ],
        }),
        ...(demographics.length && {
          CustomerDemographics: demographics.map((demo) => ({
            OmedaDemographicId: demo.id,
            OmedaDemographicValue: demo.values,
          })),
        }),
        ...(promoCode && { PromoCode: promoCode }),
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
    async changedCustomers(_, { input }, { apiClient }) {
      const { startDate, endDate } = input;
      const response = await apiClient.resource('customer').changeLookup({
        startDate,
        endDate,
      });
      return response.data;
    },

    /**
     *
     */
    async customerById(_, { input }, { apiClient }) {
      const { id, reQueryOnInactive, errorOnNotFound } = input;
      const response = await apiClient.resource('customer').lookupById({
        customerId: id,
        reQueryOnInactive,
        errorOnNotFound,
      });
      return response.data.Id ? response.data : null;
    },

    /**
     * @deprecated Typo, remove this when associated query is removed from schema.
     */
    async customerByEncyptedId(_, { input }, { apiClient }) {
      const { id, errorOnNotFound } = input;
      const response = await apiClient.resource('customer').lookupByEncryptedId({
        encryptedId: id,
        errorOnNotFound,
      });
      return response.data.Id ? response.data : null;
    },

    /**
     *
     */
    async customerByEncryptedId(_, { input }, { apiClient }) {
      const { id, errorOnNotFound } = input;
      const response = await apiClient.resource('customer').lookupByEncryptedId({
        encryptedId: id,
        errorOnNotFound,
      });
      return response.data.Id ? response.data : null;
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
