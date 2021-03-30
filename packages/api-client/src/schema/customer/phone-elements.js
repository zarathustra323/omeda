const load = require('../utils/from-four-col');

module.exports = load('customer-phone-elements', `
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
      <td>unique phone identifier</td>
    </tr>
    <tr>
      <td>PhoneContactType</td>
      <td>Yes</td>
      <td>Integer</td>
      <td>integer that defines the type of phone (see&nbsp;<a title="Standard API Constants and Codes"
          href="https://main.omeda.com/knowledge-base/api-standard-constants-and-codes/">Standard API Constants and
          Codes</a>)</td>
    </tr>
    <tr>
      <td>PhoneNumber</td>
      <td>Yes</td>
      <td>String</td>
      <td>actual phone number</td>
    </tr>
    <tr>
      <td>Extension</td>
      <td>No</td>
      <td>String</td>
      <td>phone extension</td>
    </tr>
    <tr>
      <td>ChangedDate</td>
      <td>Yes</td>
      <td>DateTime</td>
      <td>Date &amp; time record last changed. yyyy-MM-dd HH:mm:ss format. Example: 2010-03-08 21:23:34.</td>
    </tr>
    <tr>
      <td>StatusCode</td>
      <td>No</td>
      <td>Byte</td>
      <td>Status of the postal address: 1 is the primary address, 2 is an active address.</td>
    </tr>
  </tbody>
</table>
`);
