const { createRepos } = require('@parameter1/omeda-mongodb');
const client = require('./index');

module.exports = createRepos({ client });
