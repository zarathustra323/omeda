const load = require('../utils/from-four-col');

module.exports = load('email-deployment-tester-elements', `
<table>
  <tbody>
    <tr>
      <th>Attribute Name</th>
      <th>Required?</th>
      <th>Data Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>FirstName</td>
      <td>required</td>
      <td>string</td>
      <td>The first name of the tester.</td>
    </tr>
    <tr>
      <td>LastName</td>
      <td>required</td>
      <td>string</td>
      <td>The last name of the tester.</td>
    </tr>
    <tr>
      <td>EmailAddress</td>
      <td>required</td>
      <td>string</td>
      <td>The email address of the tester.</td>
    </tr>
  </tbody>
</table>
`);
