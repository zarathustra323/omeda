const load = require('../utils/from-four-col');

module.exports = load('brand-product-elements', `
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
      <td>The product identifier.</td>
    </tr>
    <tr>
      <td>Description</td>
      <td>Yes</td>
      <td>String</td>
      <td>Name of the product.</td>
    </tr>
    <tr>
      <td>ProductType</td>
      <td>Yes</td>
      <td>Integer</td>
      <td>“Type” of Product. See&nbsp;<a
          href="https://training.omeda.com/knowledge-base/api-standard-constants-and-codes/">Product Types</a>.</td>
    </tr>
    <tr>
      <td>AlternateId</td>
      <td>Yes</td>
      <td>String</td>
      <td>This is the Product ID that is used in Omeda’s V10 system.</td>
    </tr>
    <tr>
      <td>Frequency</td>
      <td>No</td>
      <td>Integer</td>
      <td>Frequency of the product issues per year.</td>
    </tr>
    <tr>
      <td>FrequencyType</td>
      <td>No</td>
      <td>String</td>
      <td>The possible frequency types (Daily – DY, Weekly – WK, Monthly – MO, Yearly – YR, bi-weekly – BIW, bi-monthly
        – BIM, Manual – MA)</td>
    </tr>
    <tr>
      <td>DeploymentTypeId</td>
      <td>Yes</td>
      <td>Integer</td>
      <td>If the product is linked to a DeploymentType (Omail), then this ID will be returned.</td>
    </tr>
    <tr>
      <td>MarketingClasses</td>
      <td>No</td>
      <td>List</td>
      <td>A list of MarketingClasses elements. These elements will only be returned if the&nbsp;<a
          href="https://training.omeda.com/knowledge-base/api-standard-constants-and-codes/">Product Types</a>&nbsp;is 1
        (Magazine) or 2 (Newsletter) or 7 (Website).</td>
    </tr>
    <tr>
      <td>Issues</td>
      <td>No</td>
      <td>List</td>
      <td>A list of Issues elements. These elements will only be returned if the&nbsp;<a
          href="https://training.omeda.com/knowledge-base/api-standard-constants-and-codes/">Product Types</a>&nbsp;is 1
        (Magazine).</td>
    </tr>
  </tbody>
</table>
`);
