const load = require('../utils/from-four-col');

/**
 * @note The `Id` field is wrongly listed as `Long` on the website.
 * Changed to `String`
 */
module.exports = load('customer-behavior-elements', `
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
      <td>String</td>
      <td>The external identifier</td>
    </tr>
    <tr>
      <td>Namespace</td>
      <td>Yes</td>
      <td>String</td>
      <td>This is the acronym used to differentiate the different kinds of external ids. For example, RDRNUM for the
        Omeda Legacy Id.</td>
    </tr>
  </tbody>
</table>
`);
