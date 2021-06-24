const { get } = require('@parameter1/utils');

module.exports = {
  /**
   *
   */
  EmailAddressOptIn: {
    /**
     *
     */
    async customers({ customerIds }, _, { loaders }) {
      const responses = await loaders.customerApi.loadMany(customerIds);
      return responses.filter((r) => r).map((r) => r.data);
    },
  },

  /**
   *
   */
  EmailDeployment: {
    /**
     *
     */
    async deploymentType({ DeploymentTypeId }, _, { loaders }) {
      if (!DeploymentTypeId) return null;
      const doc = await loaders.brandDeploymentTypes.load(DeploymentTypeId);
      return get(doc, 'data');
    },
  },

  /**
   *
   */
  EmailDeploymentListItem: {
    /**
     *
     */
    async deployment(item, _, { apiClient }) {
      const { data } = await apiClient.resource('email').lookupDeploymentById({ trackId: item.TrackId });
      return data;
    },
  },

  /**
   *
   */
  Mutation: {
    /**
     *
     */
    async emailAddressOptIn(_, { input }, { apiClient, loaders, repos }) {
      const {
        emailAddress,
        subscribeToProducts,
        source,
        inputId,
      } = input;
      const deploymentTypeIds = [...new Set(input.deploymentTypeIds)];

      const [customerIds, deploymentTypes, products] = await Promise.all([
        // load customer IDs
        (async () => {
          if (!subscribeToProducts) return new Set();
          const { data } = await apiClient.resource('customer').lookupByEmailAddress({
            emailAddress,
          });
          return data;
        })(),
        // load deployment types
        (async () => {
          const docs = await loaders.brandDeploymentTypes.loadMany(deploymentTypeIds);
          return docs.filter((doc) => get(doc, 'data.Id')).map((doc) => doc.data);
        })(),
        // load products
        (async () => {
          if (!subscribeToProducts) return new Map();
          const productIds = await repos.brandProduct.distinct({
            key: 'data.Id',
            query: {
              'data.DeploymentTypeId': { $in: deploymentTypeIds },
              'data.ProductType': 2, // only newsletters can be subscribed to in this manner
            },
          });
          if (!productIds.length) return new Map();
          const docs = await loaders.brandProducts.loadMany(productIds);
          return docs.filter((doc) => get(doc, 'data.Id')).map((doc) => doc.data);
        })(),
      ]);
      if (deploymentTypes.length !== deploymentTypeIds.length) throw new Error('Unable to load all requested deployment types.');

      const promises = [
        apiClient.resource('email').optInEmailAddress({
          emailAddress,
          deploymentTypeIds,
          deleteOptOut: true,
          source,
        }),
      ];
      if (customerIds.size && products.length) {
        const Products = products.map((product) => ({ OmedaProductId: product.Id, Receive: 1 }));
        const bodies = [...customerIds].reduce((arr, customerId) => {
          arr.push({
            OmedaCustomerId: customerId,
            Products,
            RunProcessor: 1,
          });
          return arr;
        }, []);
        promises.push(...bodies.map(async (body) => {
          const r = await apiClient.resource('customer').storeCustomerAndOrder({ body, inputId });
          return r;
        }));
      }

      await Promise.all(promises);
      return {
        emailAddress,
        customerIds: [...customerIds],
        deploymentTypes,
        products,
      };
    },
  },

  /**
   *
   */
  Query: {
    /**
     *
     */
    async emailDeploymentById(_, { input }, { apiClient }) {
      const { data } = await apiClient.resource('email').lookupDeploymentById({ trackId: input.trackId });
      return data;
    },

    /**
     *
     */
    async searchEmailClicks(_, { input }, { apiClient }) {
      const response = await apiClient.resource('email').searchClicks({
        startDate: input.startDate,
        endDate: input.endDate,
        deploymentName: input.deploymentName,
        trackId: input.trackId,
      });
      return response.data;
    },

    /**
     *
     */
    async searchEmailDeployments(_, { input }, { apiClient }) {
      const response = await apiClient.resource('email').searchDeployments({
        deploymentDateStart: input.deploymentDateStart,
        deploymentDateEnd: input.deploymentDateEnd,
        deploymentDesignations: input.deploymentDesignations,
        deploymentName: input.deploymentName,
        deploymentTypeId: input.deploymentTypeId,
        enteredByOrAssignedTo: input.enteredByOrAssignedTo,
        numResults: input.numResults,
        statuses: input.statuses,
        trackId: input.trackId,
      });
      return response.data;
    },
  },
};
