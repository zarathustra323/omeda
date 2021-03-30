const load = require('../utils/from-four-col');

module.exports = load(`
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
      <td>unique address identifier</td>
    </tr>
    <tr>
      <td>AddressContactType</td>
      <td>No</td>
      <td>Integer</td>
      <td>that defines the type of address (see&nbsp;<a title="Standard API Constants and Codes"
          href="https://main.omeda.com/knowledge-base/api-standard-constants-and-codes/">Standard API Constants and
          Codes</a>)</td>
    </tr>
    <tr>
      <td>Company</td>
      <td>No</td>
      <td>String</td>
      <td>company name</td>
    </tr>
    <tr>
      <td>Street</td>
      <td>No</td>
      <td>String</td>
      <td>street mailing address</td>
    </tr>
    <tr>
      <td>ApartmentMailStop</td>
      <td>No</td>
      <td>String</td>
      <td>apartment / mail stop / suite information</td>
    </tr>
    <tr>
      <td>ExtraAddress</td>
      <td>No</td>
      <td>String</td>
      <td>any additional mailing address information pertinent to delivery that isn’t included in
        the&nbsp;<b>Company</b>,&nbsp;<b>Street</b>, or&nbsp;<b>ApartmentMailStop&nbsp;</b>elements</td>
    </tr>
    <tr>
      <td>City</td>
      <td>No</td>
      <td>String</td>
      <td>city name</td>
    </tr>
    <tr>
      <td>RegionCode</td>
      <td>No</td>
      <td>String</td>
      <td>the state, province or region code</td>
    </tr>
    <tr>
      <td>Region</td>
      <td>No</td>
      <td>String</td>
      <td>when the&nbsp;<b>RegionCode</b>&nbsp;is not available, the descriptive state, province or regional information
      </td>
    </tr>
    <tr>
      <td>PostalCode</td>
      <td>No</td>
      <td>String</td>
      <td>ZIP (USA) or postal code. For USA addresses, this will contain the full ZIP+4 code, if it is available</td>
    </tr>
    <tr>
      <td>CountryCode</td>
      <td>No</td>
      <td>String</td>
      <td>the ISO 3166-1 alpha-3 country code</td>
    </tr>
    <tr>
      <td>Country</td>
      <td>No</td>
      <td>String</td>
      <td>the full country description</td>
    </tr>
    <tr>
      <td>ChangedDate</td>
      <td>Yes</td>
      <td>DateTime</td>
      <td>Date &amp; time record last changed. yyyy-MM-dd HH:mm:ss format. Example: 2010-03-08 21:23:34.</td>
    </tr>
    <tr>
      <td>StatusCode</td>
      <td>Yes</td>
      <td>Byte</td>
      <td>Status of the postal address: 1 is the primary address, 2 is an active address.</td>
    </tr>
  </tbody>
</table>
`);
