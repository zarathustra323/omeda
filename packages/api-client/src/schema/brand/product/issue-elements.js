const load = require('../../utils/from-four-col');

module.exports = load('brand-product-issue-elements', `
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
      <td>Issue identifier.</td>
    </tr>
    <tr>
      <td>Description</td>
      <td>Yes</td>
      <td>String</td>
      <td>A description for the Issue.</td>
    </tr>
    <tr>
      <td>IssueDate</td>
      <td>Yes</td>
      <td>Datetime</td>
      <td>Date of the issue in yyyy-MM-dd format. Example: 2012-05-01.</td>
    </tr>
    <tr>
      <td>AlternateId</td>
      <td>Yes</td>
      <td>String</td>
      <td>Omeda’s legacy Issue ID.</td>
    </tr>
    <tr>
      <td>StatusCode</td>
      <td>Yes</td>
      <td>Byte</td>
      <td>See&nbsp;<a href="https://training.omeda.com/knowledge-base/brand-comprehensive-lookup/">Issue Status
          Codes</a>&nbsp;for a list of status codes and their associated values.</td>
    </tr>
  </tbody>
</table>
`);
