const load = require('../utils/from-four-col');

module.exports = load('email-deployment-split-elements', `
<table>
  <tbody>
    <tr>
      <th>Attribute Name</th>
      <th>Required?</th>
      <th>Data Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>FromEmail</td>
      <td>required</td>
      <td>string</td>
      <td>The ‘From’ email address, specified when the deployment content was created.</td>
    </tr>
    <tr>
      <td>TextSpamScore</td>
      <td>required</td>
      <td>double</td>
      <td>The SpamAssassin spam score calculated for the deployment text content. Example: ‘1.2’. Value will be 0.0 if
        no text content is present.</td>
    </tr>
    <tr>
      <td>Subject</td>
      <td>required</td>
      <td>string</td>
      <td>The subject of the email, specified when the deployment content was created.</td>
    </tr>
    <tr>
      <td>FromName</td>
      <td>required</td>
      <td>string</td>
      <td>The ‘From’ name, specified when the deployment content was created.</td>
    </tr>
    <tr>
      <td>RecipientList</td>
      <td>conditional</td>
      <td>string</td>
      <td>The name of the recipient file used when the deployment was created.</td>
    </tr>
    <tr>
      <td>QueryName</td>
      <td>conditional</td>
      <td>string</td>
      <td>The name of the OnQ query used for the deployment.</td>
    </tr>
    <tr>
      <td>OutputCriteria</td>
      <td>conditional</td>
      <td>string</td>
      <td>The name of the OnQ output criteria used when using an OnQ query for the deployment audience, otherwise
        ‘Default’.</td>
    </tr>
    <tr>
      <td>HtmlSpamScore</td>
      <td>required</td>
      <td>double</td>
      <td>The SpamAssassin spam score calculated for the deployment Html content. Example: ‘1.2’. Value will be 0.0 if
        no Html content is present.</td>
    </tr>
    <tr>
      <td>Sequence</td>
      <td>required</td>
      <td>integer</td>
      <td>The split number: 1, 2, etc… depending on how many splits the deployment has.</td>
    </tr>
    <tr>
      <td>HtmlContentUrl</td>
      <td>required</td>
      <td>link</td>
      <td>A url to retrieve the html content for the given deployment. Format :&nbsp;<a class="externallink"
          href="http://ows.omeda.com/webservice/rest/brand/%7BbrandAbbreviation%7D/omail/deployment/content/lookup/html/%7BtrackId%7D/1/*"
          target="_blank"
          rel="nofollow noopener">http://ows.omeda.com/webservice/rest/brand/{brandAbbreviation}/omail/deployment/content/lookup/html/{trackId}/1/*</a>&nbsp;.
      </td>
    </tr>
    <tr>
      <td>TextContentUrl</td>
      <td>required</td>
      <td>link</td>
      <td>A url to retrieve the text content for the given deployment. Format :&nbsp;<a class="externallink"
          href="http://ows.omeda.com/webservice/rest/brand/%7BbrandAbbreviation%7D/omail/deployment/content/lookup/text/%7BtrackId%7D/1/*"
          target="_blank"
          rel="nofollow noopener">http://ows.omeda.com/webservice/rest/brand/{brandAbbreviation}/omail/deployment/content/lookup/text/{trackId}/1/*</a>&nbsp;.
      </td>
    </tr>
  </tbody>
</table>
`);
