const StringCode = require('../string-code');

const map = [
  'Accepted',
  'Approved',
  'Cancelled',
  'New',
  'Not Accepted',
  'Scheduled',
  'Sending',
  'Sent',
  'Submitted',
  'Unscheduling',
  'Waiting Review',
].reduce((o, k) => ({ ...o, [k.toUpperCase().replace(' ', '_')]: k }), {});

class DeploymentStatus extends StringCode {
  constructor(value) {
    super({ map, value });
  }
}

module.exports = DeploymentStatus;
