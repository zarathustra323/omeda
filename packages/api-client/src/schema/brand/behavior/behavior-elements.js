const load = require('../../utils/from-four-col');

module.exports = load('brand-behavior-elements', `
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
      <td>Behavior Identifier</td>
    </tr>
    <tr>
      <td>ActionId</td>
      <td>Yes</td>
      <td>Integer</td>
      <td>Behavior Action Identifier – all behaviors must belong to a behavior action, which is predefined in the
        database. Some examples of behavior actions are “View”, “Download”, “Registered”, “Attend” – each of which
        contains has numeric identifier.</td>
    </tr>
    <tr>
      <td>Description</td>
      <td>Yes</td>
      <td>String</td>
      <td>Description of the Behavior.</td>
    </tr>
    <tr>
      <td>Category</td>
      <td>No</td>
      <td>Integer Array</td>
      <td>List of CategoryIds that are attached to this Behavior.</td>
    </tr>
    <tr>
      <td>AlternateId</td>
      <td>No</td>
      <td>String</td>
      <td>An id that can be used to uniquely identify this behavior (perhaps in your content management system).</td>
    </tr>
    <tr>
      <td>ProductId</td>
      <td>No</td>
      <td>Integer</td>
      <td>Links the Behavior to a specific Product defined in the database.</td>
    </tr>
  </tbody>
</table>
`);
