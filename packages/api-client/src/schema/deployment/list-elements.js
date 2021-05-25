const load = require('../utils/from-four-col');

module.exports = load('email-deployment-list-elements', `
<table>
  <tbody>
    <tr>
      <th>Element Name</th>
      <th>Required ?</th>
      <th>Data Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>Owner</td>
      <td>required</td>
      <td>string</td>
      <td>Omail user who owns the deployment. Generally this is the creator of the deployment.</td>
    </tr>
    <tr>
      <td>Status</td>
      <td>required</td>
      <td>string</td>
      <td>The deployment state.</td>
    </tr>
    <tr>
      <td>FinalApprover</td>
      <td>required</td>
      <td>string</td>
      <td>Omail account userID specified as the final approver of the deployment.</td>
    </tr>
    <tr>
      <td>Url</td>
      <td>required</td>
      <td>link</td>
      <td>Url for the&nbsp;<a title="Deployment Lookup Resource"
          href="https://main.omeda.com/knowledge-base/api-email-deployment-lookup-resource/">Deployment Lookup Api</a>.
      </td>
    </tr>
    <tr>
      <td>DeploymentTypeId</td>
      <td>required</td>
      <td>integer</td>
      <td>Deployment type id for the deployment.</td>
    </tr>
    <tr>
      <td>DeploymentTypeDescription</td>
      <td>required</td>
      <td>string</td>
      <td>The ‘name’ of the deployment type for the deployment. Example: “Digital Newsletters”.</td>
    </tr>
    <tr>
      <td>DeploymentDesignation</td>
      <td>required</td>
      <td>string</td>
      <td>The deployment designation.</td>
    </tr>
    <tr>
      <td>TrackId</td>
      <td>required</td>
      <td>string</td>
      <td>Omail deployment tracking number.</td>
    </tr>
    <tr>
      <td>CreatedDate</td>
      <td>required</td>
      <td>datetime</td>
      <td>Date &amp; time the deployment was created. yyyy-MM-dd HH:mm:ss format. Example: 2010-03-08 21:23:34.</td>
    </tr>
    <tr>
      <td>CreatedBy</td>
      <td>required</td>
      <td>string</td>
      <td>Omail account userID that created the deployment.</td>
    </tr>
    <tr>
      <td>ScheduledDate</td>
      <td>conditional</td>
      <td>datetime</td>
      <td>Date &amp; time the deployment is scheduled to deploy. yyyy-MM-dd HH:mm:ss format. Example: 2010-03-08
        21:23:34.</td>
    </tr>
    <tr>
      <td>SentDate</td>
      <td>conditional</td>
      <td>datetime</td>
      <td>Avaialable only if the deployment has been sent. Date &amp; time the deployment was sent. yyyy-MM-dd HH:mm:ss
        format. Example: 2010-03-08 21:23:34.</td>
    </tr>
    <tr>
      <td>DeploymentName</td>
      <td>required</td>
      <td>string</td>
      <td>User-specified deployment name</td>
    </tr>
  </tbody>
</table>
`);
