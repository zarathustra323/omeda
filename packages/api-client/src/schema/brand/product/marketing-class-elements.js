const load = require('../../utils/from-four-col');

module.exports = load('brand-product-marketing-class-elements', `
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
      <td>Marketing class identifier.</td>
    </tr>
    <tr>
      <td>Description</td>
      <td>Yes</td>
      <td>String</td>
      <td>Name of the marketing class.</td>
    </tr>
    <tr>
      <td>ShortDescription</td>
      <td>Yes</td>
      <td>String</td>
      <td>A short name of the marketing class.</td>
    </tr>
    <tr>
      <td>ClassId</td>
      <td>Yes</td>
      <td>String</td>
      <td>Marketing class identifier associated with legacy products.</td>
    </tr>
    <tr>
      <td>StatusCode</td>
      <td>Yes</td>
      <td>String</td>
      <td>See&nbsp;<a href="https://training.omeda.com/knowledge-base/brand-comprehensive-lookup/">Marketing Class
          Statuses</a>&nbsp;for a list of status codes and their associated values</td>
    </tr>
  </tbody>
</table>
`);
