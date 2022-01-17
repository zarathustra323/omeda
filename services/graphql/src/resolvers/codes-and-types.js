module.exports = {
  /**
   *
   */
  ContactTypeStatusCodeEnum: {
    ACTIVE: 2,
    PRIMARY: 1,
  },

  /**
   *
   */
  CustomerChangeStatusCodeEnum: {
    ACTIVE: 1,
    INACTIVE: 0,
  },

  /**
   *
   */
  CustomerMergeCodeEnum: {
    MERGEABLE: 1,
    NON_MERGABLE: 0,
  },

  /**
   *
   */
  CustomerStatusCodeEnum: {
    ACTIVE: 1,
    DELETED_INACTIVE: 0,
    PROSPECT: 2,
  },

  /**
   *
   */
  DemographicTypeEnum: {
    SINGLE_CHOICE: 1,
    MULTIPLE_CHOICE: 2,
    TEXT: 3,
    YES_NO: 5,
    DATE: 6,
    WHOLE_NUMBER: 7,
    DECIMAL: 8,
  },

  /**
   *
   */
  DemographicValueTypeEnum: {
    OTHER: 4,
    NONE_OF_THE_ABOVE: 3,
    STANDARD: 0,
  },

  /**
   *
   */
  DeploymentDesignationEnum: {
    ADVERTISER_PROMOTION: 'Advertiser Promotion',
    AUDIENCE_PROMOTION: 'Audience Promotion',
    DIGITAL_MAGAZINE: 'Digital Magazine',
    LIVE_CONFERENCES: 'Live Conferences',
    MARKETING: 'Marketing',
    NEWSLETTER: 'Newsletter',
    OTHER_COMMUNICATIONS: 'Other Communications',
    RESEARCH: 'Research',
    THIRD_PARTY: 'Third Party',
    VIRTUAL_CONFERENCES: 'Virtual Conferences',
    WEBINAR: 'Webinar',
  },

  /**
   *
   */
  DeploymentStatusEnum: {
    ACCEPTED: 'Accepted',
    APPROVED: 'Approved',
    CANCELLED: 'Cancelled',
    NEW: 'New',
    NOT_ACCEPTED: 'Not Accepted',
    SCHEDULED: 'Scheduled',
    SENDING: 'Sending',
    SENT: 'Sent',
    SUBMITTED: 'Submitted',
    UNSCHEDULING: 'Unscheduling',
    WAITING_REVIEW: 'Waiting Review',
  },

  /**
   *
   */
  EmailAddressContactTypeEnum: {
    PRIMARY: 300,
    SECONDARY: 310,
    UNKNOWN: 0,
  },

  /**
   *
   */
  PhoneNumberContactTypeEnum: {
    BUSINESS: 200,
    FAX: 240,
    FOREIGN: 250,
    FOREIGN_FAX: 260,
    HOME: 210,
    MOBILE: 230,
    PAGER: 270,
    UNKNOWN: 0,
  },

  /**
   *
   */
  PostalAddressContactTypeEnum: {
    BUSINESS: 100,
    HOME: 110,
    UNKNOWN: 0,
  },

  /**
   *
   */
  ProductTypeEnum: {
    MAGAZINE: 1,
    NEWSLETTER: 2,
    EVENT: 3,
    CATALOG: 4,
    EMAIL_DEPLOYMENT: 5,
    ASSOCIATION_MEMBERSHIP: 6,
    WEBSITE: 7,
    NEWSSTAND: 8,
    ACCOUNTING: 9,
    SALES: 10,
  },

  /**
   *
   */
  WebformViewCodeEnum: {
    HIDDEN: 0,
    OPTIONAL: 2,
    REQUIRED: 1,
  },
};
