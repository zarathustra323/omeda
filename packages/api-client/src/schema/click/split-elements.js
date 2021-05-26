const load = require('../utils/from-four-col');

module.exports = load('click-split-elements', `
<table>
  <tbody>
    <tr>
      <th>Element Name</th>
      <th>Required ?</th>
      <th>Data Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>Split</td>
      <td>required</td>
      <td>string</td>
      <td>Split number</td>
    </tr>
    <tr>
      <td>SubjectLine</td>
      <td>required</td>
      <td>string</td>
      <td>Email subject line for this split</td>
    </tr>
    <tr>
      <td>Links</td>
      <td>required</td>
      <td>string</td>
      <td>JSON element containing one or more Link elements (see below)</td>
    </tr>
  </tbody>
</table>
`);
