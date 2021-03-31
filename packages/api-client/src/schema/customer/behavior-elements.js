const load = require('../utils/from-three-col');

module.exports = load('customer-behavior-elements', `
<table>
  <tbody>
    <tr>
      <th>Element Name</th>
      <th>Data Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>BehaviorId</td>
      <td>Integer</td>
      <td>Identifies the behavior being returned for the customer</td>
    </tr>
    <tr>
      <td>FirstOccurrenceDate</td>
      <td>DateTime</td>
      <td>First time the behavior occurred.</td>
    </tr>
    <tr>
      <td>LastOccurrenceDate</td>
      <td>DateTime</td>
      <td>Most recent time the behavior occurred</td>
    </tr>
    <tr>
      <td>NumberOfOccurrences</td>
      <td>Integer</td>
      <td>Total number of behavioral occurrences</td>
    </tr>
    <tr>
      <td>PromoCode</td>
      <td>String</td>
      <td>Returns the most recent promo code (if any) associated with the behavior. Always optional.</td>
    </tr>
  </tbody>
</table>
`);
