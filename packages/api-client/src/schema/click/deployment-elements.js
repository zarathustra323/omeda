const load = require('../utils/from-four-col');

/**
 * @note `Splits` was renamed to `splits` due to the actual response body.
 * @note changed `SentDate` datatype from `string` to `date`
 */
module.exports = load('click-deployment-elements', `
<table>
  <tbody>
    <tr>
      <th>Element Name</th>
      <th>Required ?</th>
      <th>Data Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>DeploymentName</td>
      <td>required</td>
      <td>string</td>
      <td>User-specified deployment name</td>
    </tr>
    <tr>
      <td>TrackId</td>
      <td>required</td>
      <td>string</td>
      <td>Omail deployment tracking number.</td>
    </tr>
    <tr>
      <td>SentDate</td>
      <td>required</td>
      <td>date</td>
      <td>Date that the deployment was sent</td>
    </tr>
    <tr>
      <td>splits</td>
      <td>required</td>
      <td>string</td>
      <td>JSON element containing one or more Split elements (see below)</td>
    </tr>
  </tbody>
</table>
`);
