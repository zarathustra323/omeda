const load = require('../utils/from-four-col');

module.exports = load('brand-demographic-elements', `
<table>
  <tbody>
    <tr>
      <th>Element Name</th>
      <th>Always Returned…</th>
      <th>Data Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>Id</td>
      <td>Yes</td>
      <td>Integer</td>
      <td>This is the Omeda demographic id, and is the value used for the&nbsp;<b>OmedaDemographicId</b>&nbsp;attribute
        when utilizing the&nbsp;<a title="Save Customer API"
          href="https://main.omeda.com/knowledge-base/save-customer-and-order/">Save Customer and Order API</a>.</td>
    </tr>
    <tr>
      <td>DemographicType</td>
      <td>Yes</td>
      <td>Integer</td>
      <td>Type of demographic. See&nbsp;<a title="Brand Comprehensive Lookup Service"
          href="https://main.omeda.com/knowledge-base/brand-comprehensive-lookup/#additional-information">Demographic
          Types</a>&nbsp;for the list of values and their descriptions</td>
    </tr>
    <tr>
      <td>Description</td>
      <td>Yes</td>
      <td>String</td>
      <td>The name of the demographic, and the value used for the&nbsp;<b>ClientDemographicId</b>&nbsp;attribute when
        utilizing the&nbsp;<a title="Save Customer API"
          href="https://main.omeda.com/knowledge-base/save-customer-and-order/">Save Customer and Order API</a>.</td>
    </tr>
    <tr>
      <td>DemoLegacyId</td>
      <td>Yes</td>
      <td>String</td>
      <td>This is the Demographic ID that is used in the Omeda’s V10 system.</td>
    </tr>
    <tr>
      <td>DemographicValues</td>
      <td>Yes</td>
      <td>List</td>
      <td>a list of DemographicValue elements. These define the values associated with the customized demographic
        information that is being collected about a customer</td>
    </tr>
    <tr>
      <td>AuditedProducts</td>
      <td>No</td>
      <td>List</td>
      <td>This is a list of Product Ids that the demo is audited for. If the demo is not audited for any product, this
        will not be returned.</td>
    </tr>
    <tr>
      <td>OmedaWebformText</td>
      <td>Yes</td>
      <td>String</td>
      <td>Omeda INTERNAL use only</td>
    </tr>
    <tr>
      <td>OmedaWebformViewCode</td>
      <td>Yes</td>
      <td>Integer</td>
      <td>Omeda INTERNAL use only. See&nbsp;<a title="Brand Comprehensive Lookup Service"
          href="https://main.omeda.com/knowledge-base/brand-comprehensive-lookup/#additional-information">View
          Codes</a>&nbsp;for the list of values and their descriptions</td>
    </tr>
    <tr>
      <td>OmedaWebformSequence</td>
      <td>Yes</td>
      <td>Integer</td>
      <td>Omeda INTERNAL use only</td>
    </tr>
  </tbody>
</table>
`);
