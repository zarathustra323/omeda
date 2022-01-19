const IntegerCode = require('../../integer-code');

const map = {
  0: 'Planned',
  10: 'Open',
  20: 'Locked',
  30: 'Closed',
  40: 'Current Supplement',
  45: 'Current Supplement Closed',
  50: 'In Progress',
  55: 'In Progress Closed',
};

class ProductIssueStatus extends IntegerCode {
  constructor(value) {
    super({ map, value });
  }
}

module.exports = ProductIssueStatus;
