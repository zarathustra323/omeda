const load = require('../utils/from-four-col');

module.exports = load('click-link-elements', `
<table>
  <tbody>
    <tr>
      <th>Element Name</th>
      <th>Required ?</th>
      <th>Data Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>TotalClicks</td>
      <td>required</td>
      <td>Integer</td>
      <td>Sum of all of the NumberOfClicks returned in the Clicks array (see below)</td>
    </tr>
    <tr>
      <td>LinkURL</td>
      <td>required</td>
      <td>string</td>
      <td>The URL of the link that was clicked</td>
    </tr>
    <tr>
      <td>Clicks</td>
      <td>required</td>
      <td>string</td>
      <td>JSON element containing one or more Click elements (see below)</td>
    </tr>
  </tbody>
</table>
`);
