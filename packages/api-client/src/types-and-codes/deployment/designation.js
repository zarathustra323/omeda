const StringCode = require('../string-code');

const map = [
  'Advertiser Promotion',
  'Audience Promotion',
  'Digital Magazine',
  'Live Conferences',
  'Marketing',
  'Newsletter',
  'Other Communications',
  'Research',
  'Third Party',
  'Virtual Conferences',
  'Webinar',
].reduce((o, k) => ({ ...o, [k]: k.toUpperCase().replace(' ', '_') }), {});

class DeploymentDesignation extends StringCode {
  constructor(value) {
    super({ map, value });
  }
}

module.exports = DeploymentDesignation;
