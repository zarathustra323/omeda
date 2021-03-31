const load = require('../utils/from-four-col');

module.exports = load('brand-basic-elements', `
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
      <td>The brand identifier.</td>
    </tr>
    <tr>
      <td>Description</td>
      <td>Yes</td>
      <td>String</td>
      <td>The name of the brand.</td>
    </tr>
    <tr>
      <td>BrandAbbrev</td>
      <td>Yes</td>
      <td>String</td>
      <td>The abbreviation for the brand (used in most web service URLs).</td>
    </tr>
    <tr>
      <td>CustomerCount</td>
      <td>Yes</td>
      <td>Integer</td>
      <td>The count of all customers that are associated with the brand (regardless of status).</td>
    </tr>
    <tr>
      <td>Demographics</td>
      <td>Yes</td>
      <td>List</td>
      <td>A list of Demographic elements. These define the customized information that is being collected about a
        customer for this brand.</td>
    </tr>
    <tr>
      <td>Products</td>
      <td>Yes</td>
      <td>List</td>
      <td>A list of Product elements. These specify the products that can be associated with customers for this brand.
      </td>
    </tr>
    <tr>
      <td>ContactTypes</td>
      <td>Yes</td>
      <td>List</td>
      <td>A list of ContactType elements. These decode the different forms of contact a customer can have.</td>
    </tr>
    <tr>
      <td>DeploymentTypes</td>
      <td>Yes</td>
      <td>List</td>
      <td>A list of DeploymentType elements. These decode the opt-out codes that emails are sent out under.</td>
    </tr>
  </tbody>
</table>
`);
