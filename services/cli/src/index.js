const OmedaApiClient = require('@parameter1/omeda-api-client');
const inquirer = require('inquirer');
const { eachSeries } = require('async');
const availableActions = require('./actions');
const {
  OMEDA_APP_ID,
  OMEDA_INPUT_ID,
  OMEDA_BRAND_KEY,
  OMEDA_CLIENT_KEY,
  isDev,
} = require('./env');

const { log } = console;

const main = async () => {
  const {
    appId,
    inputId,
    brandKey,
    clientKey,
    useStaging,
    actions,
    siteKey,
  } = await inquirer.prompt([
    {
      type: 'input',
      name: 'appId',
      default: OMEDA_APP_ID,
      message: 'What Omeda Application ID should be used?',
    },
    {
      type: 'input',
      name: 'inputId',
      default: OMEDA_INPUT_ID,
      message: 'What Omeda Input ID should be used?',
    },
    {
      type: 'input',
      name: 'brandKey',
      default: OMEDA_BRAND_KEY,
      message: 'What Omeda Brand Key should be used?',
    },
    {
      type: 'input',
      name: 'clientKey',
      default: OMEDA_CLIENT_KEY,
      message: 'What Omeda Client Key should be used?',
    },
    {
      type: 'confirm',
      name: 'useStaging',
      message: 'Should the Omeda staging environment be used?',
      default: isDev,
    },
    {
      type: 'checkbox',
      name: 'actions',
      message: 'What actions should be run?',
      choices: Object.keys(availableActions),
      default: Object.keys(availableActions), // @todo remove
    },
    {
      type: 'input',
      when: (ans) => ans.actions.includes('createIdentityXBehaviors') || ans.actions.includes('assignIdentityXBehaviorsToCategory'),
      name: 'siteKey',
      message: 'What site key should be used (optional behavior suffix)',
    },
  ]);

  // Create API client
  const apiClient = new OmedaApiClient({
    appId,
    brand: brandKey,
    clientAbbrev: clientKey,
    inputId,
    useStaging,
  });

  log(`Executing ${actions.length} actions.`);
  await eachSeries(actions, async (action) => availableActions[action]({
    apiClient,
    ...(siteKey && { siteKey }),
  }));

  log('Done!');
};

main().catch((e) => { throw e; });
