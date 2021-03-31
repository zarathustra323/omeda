const load = require('../utils/from-four-col');

module.exports = load('brand-demographic-value-elements', `
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
      <td>This is the Omeda demographic value id, and the value used for
        the&nbsp;<b>OmedaDemographicValue</b>&nbsp;attribute when utilizing the&nbsp;<a title="Save Customer API"
          href="https://main.omeda.com/knowledge-base/save-customer-and-order/">Save Customer and Order API</a>.</td>
    </tr>
    <tr>
      <td>Description</td>
      <td>Yes</td>
      <td>String</td>
      <td>The name of the demographic value.</td>
    </tr>
    <tr>
      <td>ShortDescription</td>
      <td>Yes</td>
      <td>String</td>
      <td>The short name of the demographic value.</td>
    </tr>
    <tr>
      <td>DemographicValueType</td>
      <td>Yes</td>
      <td>Integer</td>
      <td>Type of demographic value. See&nbsp;<a title="Brand Comprehensive Lookup Service"
          href="https://main.omeda.com/knowledge-base/brand-comprehensive-lookup/#additional-information">Demographic
          Value Types</a>&nbsp;for the list of values and their descriptions</td>
    </tr>
    <tr>
      <td>AlternateId</td>
      <td>Yes</td>
      <td>String</td>
      <td>The client’s associated value to Omeda’s demographic value, and the value used for
        the&nbsp;<b>ClientDemographicValue</b>&nbsp;attribute when using the&nbsp;<a title="Save Customer API"
          href="https://main.omeda.com/knowledge-base/save-customer-and-order/">Save Customer and Order API</a>.</td>
    </tr>
    <tr>
      <td>Sequence</td>
      <td>Yes</td>
      <td>Integer</td>
      <td>Order in which to display demographic items. If you would like this order to be adjusted, please contact your
        Account Representative.</td>
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
