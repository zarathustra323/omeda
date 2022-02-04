const { UserInputError } = require('apollo-server-express');
const { get, getAsArray } = require('@parameter1/utils');
const newrelic = require('../newrelic');

const noticeError = newrelic.noticeError.bind(newrelic);

// const upsertCustomerData = async ({ id, encrypted = false, response }, { repos, loaders }) => {
const upsertCustomerData = async () => {
  // if (!response.data || !response.data.Id) return null;
  // store customer record in local db.
  // const { Id } = response.data;

  // const getDataFromLoader = async (key) => {
  //   const r = await loaders[key].load(Id);
  //   return r ? r.data : [];
  // };

  // const [
  //   Addresses,
  //   CustomerDemographics,
  //   EmailAddresses,
  //   MergeHistory, // @todo should merged records be whiped from local?
  //   Phones,
  //   Subscriptions,
  // ] = await Promise.all([
  //   getDataFromLoader('customerPostalAddresses'),
  //   getDataFromLoader('customerDemographics'),
  //   getDataFromLoader('customerEmails'),
  //   getDataFromLoader('mergeHistory'),
  //   getDataFromLoader('customerPhoneNumbers'),
  //   getDataFromLoader('customerSubscriptions'),
  // ]);

  // const record = {
  //   ...response.data,
  //   Addresses,
  //   CustomerDemographics,
  //   EmailAddresses,
  //   MergeHistory,
  //   Phones,
  //   Subscriptions,
  // };

  // return repos.customer.upsert({ id, encrypted, record });
};

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
    async mergeHistory({ Id }, _, { loaders }) {
      const response = await loaders.customerMergeHistory.load(Id);
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
    emailAddress({ EmailAddress }) {
      return EmailAddress.trim().toLowerCase();
    },

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

      const deploymentTypeIdMap = input.deploymentTypeIds.reduce((map, id) => {
        map.set(id, true);
        return map;
      }, new Map());

      const deploymentTypeOptInMap = input.deploymentTypes.reduce((map, type) => {
        map.set(type.id, type.optedIn);
        return map;
      }, deploymentTypeIdMap);

      const deploymentTypeIds = [...deploymentTypeOptInMap.keys()];

      const productDeploymentTypeMap = await (async () => {
        if (!deploymentTypeIds.length) return [];
        const cursor = await repos.brandProduct.find({
          query: {
            'data.DeploymentTypeId': { $in: deploymentTypeIds },
            'data.ProductType': 2, // only newsletters can be subscribed to in this manner
          },
          options: { projection: { 'data.Id': 1, 'data.DeploymentTypeId': 1 } },
        });
        const docs = await cursor.toArray();
        return docs.reduce((map, doc) => {
          const { Id, DeploymentTypeId } = doc.data;
          map.set(Id, DeploymentTypeId);
          return map;
        }, new Map());
      })();

      productDeploymentTypeMap.forEach((deploymentTypeId, productId) => {
        const optedIn = deploymentTypeOptInMap.get(deploymentTypeId);
        if (optedIn == null) return;
        Products.push({ OmedaProductId: productId, Receive: Number(optedIn) });
      });

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
          if (!deploymentTypeOptInMap.size) return null;
          const optInIds = [];
          const optOutIds = [];
          deploymentTypeOptInMap.forEach((optedIn, id) => {
            if (optedIn) {
              optInIds.push(id);
            } else {
              optOutIds.push(id);
            }
          });
          const emailResource = apiClient.resource('email');
          return Promise.all([
            // opt-ins
            optInIds.length ? emailResource.optInEmailAddress({
              emailAddress: email,
              deploymentTypeIds: optInIds,
              deleteOptOut: true,
            }) : Promise.resolve(),
            // opt-outs
            optOutIds.length ? emailResource.optOutEmailAddress({
              emailAddress: email,
              deploymentTypeIds: optOutIds,
            }) : Promise.resolve(),
          ]);
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
    async customerById(_, { input }, { apiClient, loaders, repos }) {
      const { id, reQueryOnInactive, errorOnNotFound } = input;
      const response = await apiClient.resource('customer').lookupById({
        customerId: id,
        reQueryOnInactive,
        errorOnNotFound,
      });
      if (!response.data.Id) return null;
      // store customer record in local db.
      upsertCustomerData({ id, encrypted: false, response }, { repos, loaders }).catch(noticeError);
      return response.data;
    },

    /**
     *
     */
    async customerByEncryptedId(_, { input }, { apiClient, loaders, repos }) {
      const { id, errorOnNotFound } = input;
      const response = await apiClient.resource('customer').lookupByEncryptedId({
        encryptedId: id,
        errorOnNotFound,
      });

      if (!response.data.Id) return null;
      // store customer record in local db.
      upsertCustomerData({ id, encrypted: true, response }, { repos, loaders }).catch(noticeError);
      return response.data;
    },

    /**
     *
     */
    async customersByEmailAddress(_, { input }, { apiClient, loaders, repos }) {
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
        // store customer record in local db.
        upsertCustomerData({
          id: customerId,
          encrypted: false,
          response,
        }, { repos, loaders }).catch(noticeError);
        return response.data;
      }));
    },
  },
};
