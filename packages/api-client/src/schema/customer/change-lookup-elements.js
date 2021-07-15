const load = require('../utils/from-four-col');

module.exports = load('customer-lookup-elements', `
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
      <td>the internal customer identifier</td>
    </tr>
    <tr>
      <td>Url</td>
      <td>Yes</td>
      <td>Link</td>
      <td>a link reference to the customer data as a resource.</td>
    </tr>
    <tr>
      <td>DateChanged</td>
      <td>Yes</td>
      <td>Date</td>
      <td>the last date the customer was changed or when the customer was first created.</td>
    </tr>
    <tr>
      <td>CreatedDate</td>
      <td>Yes</td>
      <td>Date</td>
      <td>when the customer was first created.</td>
    </tr>
    <tr>
      <td>CustomerStatusId</td>
      <td>Yes</td>
      <td>Integer</td>
      <td>the status of the customer. 0 = Inactive, 1 = Active.</td>
    </tr>
  </tbody>
</table>
`);
