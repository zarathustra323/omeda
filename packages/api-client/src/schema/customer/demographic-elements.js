const load = require('../utils/from-four-col');

module.exports = load('customer-demographic-elements', `
<table>
  <tbody>
    <tr>
      <th>Element Name</th>
      <th>Always Returned…</th>
      <th>Data type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>Id</td>
      <td>No</td>
      <td>Integer</td>
      <td>unique customer demographic identifier</td>
    </tr>
    <tr>
      <td>DemographicId</td>
      <td>No</td>
      <td>Integer</td>
      <td>integer that defines the demographic the responses are gathered for</td>
    </tr>
    <tr>
      <td>DemographicType</td>
      <td>No</td>
      <td>Integer</td>
      <td>integer – see Additional Information for the list of values and their descriptions</td>
    </tr>
    <tr>
      <td>DemographicAge</td>
      <td>No</td>
      <td>Integer</td>
      <td>integer – The number of years since the demographic was collected for this customer. The “year” is calculated
        based on the product’s audit cycle.</td>
    </tr>
    <tr>
      <td>ValueId</td>
      <td>Yes</td>
      <td>Integer</td>
      <td>the individual response value, if the response/data was for a single-response or a multiple-response
        demographic.</td>
    </tr>
    <tr>
      <td>ValueText</td>
      <td>Yes</td>
      <td>String</td>
      <td>the individual response value, if the response/data was for a text-response demographic.</td>
    </tr>
    <tr>
      <td>ValueDate</td>
      <td>Yes</td>
      <td>DateTime</td>
      <td>the individual response value, if the response/data was for a date-response demographic.</td>
    </tr>
    <tr>
      <td>WriteInDesc</td>
      <td>Yes</td>
      <td>String</td>
      <td>If the Demographics Value “Type” is an “Other” response, and a text answer is being stored for this “Other”
        value, then the text answer will be returned.</td>
    </tr>
    <tr>
      <td>AlternateId</td>
      <td>No</td>
      <td>String</td>
      <td>An id that can be used to uniquely identify this demographic(perhaps in your content management system).</td>
    </tr>
    <tr>
      <td>ChangedDate</td>
      <td>no</td>
      <td>DateTime</td>
      <td>Date &amp; time record last changed. yyyy-MM-dd HH:mm:ss format. Example: 2010-03-08 21:23:34.</td>
    </tr>
  </tbody>
</table>
`);
