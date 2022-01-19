const load = require('../utils/from-four-col');

module.exports = load('brand-deployment-type-elements', `
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
      <td>Deployment type identifier.</td>
    </tr>
    <tr>
      <td>Name</td>
      <td>Yes</td>
      <td>String</td>
      <td>The name of the deployment type.</td>
    </tr>
    <tr>
      <td>Description</td>
      <td>Yes</td>
      <td>String</td>
      <td>The name of the deployment type.Use the Name field instead, this field will be depreciated soon!</td>
    </tr>
    <tr>
      <td>LongDescription</td>
      <td>No</td>
      <td>String</td>
      <td>The text description of the deployment type.</td>
    </tr>
    <tr>
      <td>AlternateId</td>
      <td>Yes</td>
      <td>String</td>
      <td>The client’s associated value to Omeda’s deployment type identifier.</td>
    </tr>
    <tr>
      <td>StatusCode</td>
      <td>Yes</td>
      <td>Byte</td>
      <td>See&nbsp;<a href="https://training.omeda.com/knowledge-base/brand-comprehensive-lookup/">Deployment Type
          Status Codes</a>&nbsp;for a list of status codes and their associated values.</td>
    </tr>
  </tbody>
</table>
`);
