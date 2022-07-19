const load = require('../../utils/from-four-col');

/**
 * @see https://training.omeda.com/knowledge-base/behavior-actions-lookup/
 */
module.exports = load('brand-behavior-action-elements', `
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
      <td>Behavior Action Identifier</td>
    </tr>
    <tr>
      <td>Description</td>
      <td>Yes</td>
      <td>String</td>
      <td>Description of the Behavior Action.</td>
    </tr>
    <tr>
      <td>StatusCode</td>
      <td>Yes</td>
      <td>Integer</td>
      <td>1 = Active, 0 = Inactive</td>
    </tr>
  </tbody>
</table>
`);
