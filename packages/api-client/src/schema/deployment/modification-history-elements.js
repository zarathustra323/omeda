const load = require('../utils/from-four-col');

module.exports = load('email-deployment-modification-history-elements', `
<table border="2" cellspacing="0" cellpadding="3">
  <tbody>
    <tr>
      <th>Attribute Name</th>
      <th>Required?</th>
      <th>Data Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>ChangeDescription</td>
      <td>required</td>
      <td>string</td>
      <td>The description of the change made.</td>
    </tr>
    <tr>
      <td>ChangedBy</td>
      <td>required</td>
      <td>string</td>
      <td>The Omail account UserId that made the change.</td>
    </tr>
    <tr>
      <td>ChangedDate</td>
      <td>required</td>
      <td>date</td>
      <td>The date the change was made.</td>
    </tr>
  </tbody>
</table>
`);
