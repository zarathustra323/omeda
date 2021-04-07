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
  WebformViewCodeEnum: {
    HIDDEN: 0,
    OPTIONAL: 2,
    REQUIRED: 1,
  },
};
