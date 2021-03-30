const load = require('./utils/from-four-col');

module.exports = load(`
<table border="#c0c0c0" cellspacing="0" cellpadding="5">
  <tbody>
    <tr>
      <th>Element Name</th>
      <th>Always Returned…</th>
      <th>Data Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>Id</td>
      <td>Conditional</td>
      <td>Integer</td>
      <td>internal id (for use on certain databases)</td>
    </tr>
    <tr>
      <td>ReaderId</td>
      <td>Conditional</td>
      <td>Integer</td>
      <td>reader id (for use on certain databases) typically either the reader id or the id is returned, but not both.
      </td>
    </tr>
    <tr>
      <td>EncryptedCustomerId</td>
      <td>Yes</td>
      <td>String</td>
      <td>The Encrypted Customer Id for the customer</td>
    </tr>
    <tr>
      <td>Salutation</td>
      <td>No</td>
      <td>String</td>
      <td>“Mrs.”, “Mr.”, etc.</td>
    </tr>
    <tr>
      <td>FirstName</td>
      <td>No</td>
      <td>String</td>
      <td>first name</td>
    </tr>
    <tr>
      <td>MiddleName</td>
      <td>No</td>
      <td>String</td>
      <td>middle name</td>
    </tr>
    <tr>
      <td>LastName</td>
      <td>No</td>
      <td>String</td>
      <td>last name</td>
    </tr>
    <tr>
      <td>Suffix</td>
      <td>No</td>
      <td>String</td>
      <td>“Jr.”, “Sr.”, “III”, etc.</td>
    </tr>
    <tr>
      <td>Title</td>
      <td>No</td>
      <td>String</td>
      <td>job title</td>
    </tr>
    <tr>
      <td>Gender</td>
      <td>No</td>
      <td>String</td>
      <td>“F” for Female, “M” for Male, “U” for Unknown.</td>
    </tr>
    <tr>
      <td>PromoCode</td>
      <td>No</td>
      <td>String</td>
      <td>“Promo Code” last used to create/update this customer.</td>
    </tr>
    <tr>
      <td>SignUpDate</td>
      <td>No</td>
      <td>DateTime</td>
      <td>Date &amp; time customer “signed up” as customer. yyyy-MM-dd HH:mm:ss format. Example: 2010-03-08 21:23:34.
      </td>
    </tr>
    <tr>
      <td>ChangedDate</td>
      <td>No</td>
      <td>DateTime</td>
      <td>Date &amp; time record last changed. yyyy-MM-dd HH:mm:ss format. Example: 2010-03-08 21:23:34.</td>
    </tr>
    <tr>
      <td>StatusCode</td>
      <td>No</td>
      <td>Short</td>
      <td>1 for “Active”, 0 for “Deleted/Inactive”, 2 for “Prospect”.</td>
    </tr>
    <tr>
      <td>MergeCode</td>
      <td>Yes</td>
      <td>Short</td>
      <td>1 for “Mergeable”, 0 for “Non-Mergeable”</td>
    </tr>
    <tr>
      <td>Addresses</td>
      <td>Yes</td>
      <td>Link</td>
      <td>a link reference to the address data as a resource.</td>
    </tr>
    <tr>
      <td>Phones</td>
      <td>Yes</td>
      <td>Link</td>
      <td>a link reference to the phone data as a resource.</td>
    </tr>
    <tr>
      <td>EmailAddresses</td>
      <td>Yes</td>
      <td>Link</td>
      <td>a link reference to the email data as a resource.</td>
    </tr>
    <tr>
      <td>CustomerDemographics</td>
      <td>Yes</td>
      <td>Link</td>
      <td>a link reference to the customer demographic data as a resource.</td>
    </tr>
    <tr>
      <td>Subscriptions</td>
      <td>Yes</td>
      <td>Link</td>
      <td>a link reference to the subscription data as a resource.</td>
    </tr>
  </tbody>
</table>
`);
