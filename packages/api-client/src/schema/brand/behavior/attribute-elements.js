const load = require('../../utils/from-four-col');

/**
 * This schema is inferred from the shape of the API, and the schema defined for other lookup
 * operations. Until the documentation is created by Omeda, this will have to suffice.
 *
 * @see https://training.omeda.com/knowledge-base/behavior-attributes-lookup/ (404)
 * @see https://training.omeda.com/knowledge-base/behavior-categories-lookup/ (similar)
 * @see https://training.omeda.com/knowledge-base/api-store-behavior-attribute/ (put/post schema)
 */
module.exports = load('brand-behavior-attribute-elements', `
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
      <td>Behavior Attribute Identifier</td>
    </tr>
    <tr>
      <td>Description</td>
      <td>Yes</td>
      <td>String</td>
      <td>Description of the Behavior Attribute.</td>
    </tr>
    <tr>
      <td>Type</td>
      <td>Yes</td>
      <td>Integer</td>
      <td>Type of Attribute. Valid values are 1 (Defined Values), 2 (Open Text), or 3 (Open Text Number)</td>
    </tr>
    <tr>
      <td>DefinedValues</td>
      <td>No</td>
      <td>Array</td>
      <td>An array of defined values for this attribute. Contains two fields, ValueDescription and DefinedValueId.</td>
    </tr>
  </tbody>
</table>
`);
