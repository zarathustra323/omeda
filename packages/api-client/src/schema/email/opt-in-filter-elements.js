const load = require('../utils/from-three-col');

module.exports = load('email-opt-in-filter-elements', `
<table>
  <tbody>
    <tr>
      <th>Element Name</th>
      <th>Data Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>Source</td>
      <td>String</td>
      <td>How the filter was inserted into our system.</td>
    </tr>
    <tr>
      <td>DeploymentTypeId</td>
      <td>Integer</td>
      <td>The id for which the deployment is opted in or opted out.</td>
    </tr>
    <tr>
      <td>Status</td>
      <td>String</td>
      <td>Whether the customer is opted in or opted out. IN=Opted In, OUT=Opted Out</td>
    </tr>
    <tr>
      <td>Brand</td>
      <td>String</td>
      <td>The Brand for which the deployment type id belongs to.</td>
    </tr>
    <tr>
      <td>CreatedDate</td>
      <td>Datetime</td>
      <td>The date and time the filter was created.</td>
    </tr>
    <tr>
      <td>ChangedDate</td>
      <td>Datetime</td>
      <td>The date and time the filter was last updated.</td>
    </tr>
  </tbody>
</table>
`);
