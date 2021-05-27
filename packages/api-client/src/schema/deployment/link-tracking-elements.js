const load = require('../utils/from-four-col');

module.exports = load('email-deployment-link-tracking-elements', `
<table>
  <tbody>
    <tr>
      <th>Attribute Name</th>
      <th>Required?</th>
      <th>Data Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>Category</td>
      <td>optional</td>
      <td>string</td>
      <td>The category of the link</td>
    </tr>
    <tr>
      <td>CategoryValue</td>
      <td>optional</td>
      <td>string</td>
      <td>Description value for the link category</td>
    </tr>
    <tr>
      <td>Keywords</td>
      <td>optional</td>
      <td>array</td>
      <td>String array of keywords for the link</td>
    </tr>
    <tr>
      <td>LinkName</td>
      <td>optional</td>
      <td>string</td>
      <td>Name of the link</td>
    </tr>
    <tr>
      <td>LinkTag</td>
      <td>optional</td>
      <td>string</td>
      <td>Tag name of the link</td>
    </tr>
    <tr>
      <td>LinkUrl</td>
      <td>required</td>
      <td>string</td>
      <td>Url of the link</td>
    </tr>
    <tr>
      <td>MessageType</td>
      <td>required</td>
      <td>string</td>
      <td>HTML or TEXT, indicating which message body type the link belongs to</td>
    </tr>
    <tr>
      <td>Tracked</td>
      <td>required</td>
      <td>integer</td>
      <td>0 = not tracked, 1 = tracked</td>
    </tr>
    <tr>
      <td>WebTracking</td>
      <td>required</td>
      <td>integer</td>
      <td>0 = web tracking off, 1 = web tracking on</td>
    </tr>
    <tr>
      <td>UniqueClickCount</td>
      <td>optional</td>
      <td>integer</td>
      <td>Number of total unique clicks for the link</td>
    </tr>
    <tr>
      <td>ClickCount</td>
      <td>optional</td>
      <td>integer</td>
      <td>Number of total clicks for the link</td>
    </tr>
  </tbody>
</table>
`);
