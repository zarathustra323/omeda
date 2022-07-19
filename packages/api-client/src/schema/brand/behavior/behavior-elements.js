const load = require('../../utils/from-five-col');

module.exports = load('brand-behavior-elements', `
<table>
  <tbody>
    <tr>
      <th>Element Name</th>
      <th>Required on…</th>
      <th>Data Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <th>POST req.</th>
      <th>PUT req.</th>
    </tr>
    <tr>
      <td>Id</td>
      <td>Not allowed</td>
      <td>Yes</td>
      <td>Integer</td>
      <td>Behavior Identifier</td>
    </tr>
    <tr>
      <td>ActionId</td>
      <td>Yes</td>
      <td>Not allowed</td>
      <td>Integer</td>
      <td>Behavior Action Identifier – all behaviors must belong to a behavior action, which is predefined in the
        database. Some examples of behavior actions are “View”, “Download”, “Registered”, “Attend” – each of which
        contains a numeric identifier. You are not allowed to update an ActionId in an existing Behavior.</td>
    </tr>
    <tr>
      <td>Description</td>
      <td>Yes</td>
      <td>Not allowed</td>
      <td>String</td>
      <td>Description of the Behavior.</td>
    </tr>
    <tr>
      <td>AlternateId</td>
      <td>No</td>
      <td>No</td>
      <td>String</td>
      <td>An id that can be used to uniquely identify this behavior (perhaps in your content management system).</td>
    </tr>
    <tr>
      <td>ProductId</td>
      <td>No</td>
      <td>Not allowed</td>
      <td>Integer</td>
      <td>Links the Behavior to a specific Product defined in the database.</td>
    </tr>
    <tr>
      <td>StatusCode</td>
      <td>Not allowed</td>
      <td>No</td>
      <td>Integer</td>
      <td>Only allowed when doing an update. “0” to deactivate, “1” to activate.</td>
    </tr>
  </tbody>
</table>
`);
