const { cleanEnv, str } = require('envalid');

module.exports = cleanEnv(process.env, {
  OMEDA_APP_ID: str({ desc: 'The Omeda Application ID' }),
  OMEDA_INPUT_ID: str({ desc: 'The Omeda Input ID' }),
  OMEDA_BRAND_KEY: str({ desc: 'The Omeda Brand Key' }),
  OMEDA_CLIENT_KEY: str({ desc: 'The Omeda Client Key' }),
});
