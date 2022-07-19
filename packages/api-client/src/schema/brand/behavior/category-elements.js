const load = require('../../utils/from-four-col');

module.exports = load('brand-behavior-category-elements', `
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
      <td>Behavior Category Identifier</td>
    </tr>
    <tr>
      <td>Description</td>
      <td>Yes</td>
      <td>String</td>
      <td>Description of the Behavior Category.</td>
    </tr>
    <tr>
      <td>AlternateId</td>
      <td>No</td>
      <td>String</td>
      <td>An id that can be used to uniquely identify this Behavior Category (perhaps in your content management
        system).</td>
    </tr>
    <tr>
      <td>BehaviorId</td>
      <td>No</td>
      <td>Integer Array</td>
      <td>List of BehaviorIds that are attached to this Behavior Category.</td>
    </tr>
  </tbody>
</table>
`);
