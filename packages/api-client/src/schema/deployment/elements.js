const load = require('../utils/from-four-col');

/**
 * @note changed `FinalApproverUserId` datatype from `date` to `string`
 * @note changed `TrackLinks` datatype from `string` to `boolean`
 * @note changed `TrackOpens` datatype from `string` to `boolean`
 * @note changed `IsFiltered` datatype from `string` to `boolean`
 * @note added missing `TotalUnsubscribe`
 * @note added missing `CalculateSpamScore`
 * @note added missing `IsWebTrackingOn`
 */
module.exports = load('email-deployment-elements', `
<table>
  <tbody>
    <tr>
      <th>Attribute Name</th>
      <th>Required?</th>
      <th>Data Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>SentCount</td>
      <td>required</td>
      <td>integer</td>
      <td>Number of emails that have been successfully sent to email inboxes.</td>
    </tr>
    <tr>
      <td>TotalUnsubscribe</td>
      <td>required</td>
      <td>integer</td>
      <td></td>
    </tr>
    <tr>
      <td>CalculateSpamScore</td>
      <td>required</td>
      <td>booleam</td>
      <td></td>
    </tr>
    <tr>
      <td>IsWebTrackingOn</td>
      <td>required</td>
      <td>booleam</td>
      <td></td>
    </tr>
    <tr>
      <td>SentDate</td>
      <td>condition</td>
      <td>date</td>
      <td>If the deployment has been sent, the date the deployment was sent. Example: ‘2012-04-23 15:10:11’ (Central Standard Time)</td>
    </tr>
    <tr>
      <td>DeploymentName</td>
      <td>required</td>
      <td>string</td>
      <td>The user-entered name of the deployment, designated when the deployment was created.</td>
    </tr>
    <tr>
      <td>UniqueOpens</td>
      <td>required</td>
      <td>integer</td>
      <td>The number of unique email accounts that opened this deployment.</td>
    </tr>
    <tr>
      <td>SplitCount</td>
      <td>required</td>
      <td>integer</td>
      <td>The number of splits for this deployment.</td>
    </tr>
    <tr>
      <td>BounceCount</td>
      <td>required</td>
      <td>integer</td>
      <td>The number of emails that were not accepted into recipient email inboxes after the 72-hour retry period.</td>
    </tr>
    <tr>
      <td>ApprovalDate</td>
      <td>required</td>
      <td>date</td>
      <td>The date the deployment was approved for scheduling. For Omail API generated deployments, this date will be the date that the user made the&nbsp;<a title="Deployment Schedule Resource" href="https://main.omeda.com/knowledge-base/api-email-deployment-schedule-resource/">Deployment Schedule API</a>&nbsp;call. An example: ‘2012-04-23 08:58:55’ (Central Standard Time).</td>
    </tr>
    <tr>
      <td>UniqueClicks</td>
      <td>required</td>
      <td>integer</td>
      <td>The number of unique email addresses that clicked on this deployment.</td>
    </tr>
    <tr>
      <td>RetryCount</td>
      <td>required</td>
      <td>integer</td>
      <td>The number of email addresses that are currently in retry status. Emails that ‘bounce’ (are not accepted by the recipients ISP) will be retried for a 72 hour period.</td>
    </tr>
    <tr>
      <td>Splits</td>
      <td>required</td>
      <td>array</td>
      <td>Split information for the deployment. Each deployment can have one or many splits, each of which has its own email information such as Subject, From, Html content, and Text content. Please see ‘Splits Element’ table below.</td>
    </tr>
    <tr>
      <td>TotalOpens</td>
      <td>required</td>
      <td>integer</td>
      <td>The total number of email inboxes that opened the deployment</td>
    </tr>
    <tr>
      <td>OwnerUserId</td>
      <td>required</td>
      <td>string</td>
      <td>The Omail account userId that is authorized to edit the deployment.</td>
    </tr>
    <tr>
      <td>SendingCount</td>
      <td>required</td>
      <td>integer</td>
      <td>The number of emails that are currently in ‘sending’ status. They are in the process of being delivered.</td>
    </tr>
    <tr>
      <td>FinalApproverUserId</td>
      <td>required</td>
      <td>string</td>
      <td>The Final Approver for the deployment. This is specified when the deployment is created.</td>
    </tr>
    <tr>
      <td>TrackLinks</td>
      <td>required</td>
      <td>boolean</td>
      <td>true / false</td>
    </tr>
    <tr>
      <td>LinkTracking</td>
      <td>optional</td>
      <td>array</td>
      <td>An array of objects that hold a list of the links that were tracked with total click counts and unique click counts etc. Please see the ‘LinkTracking Elements’ below for a list of fields</td>
    </tr>
    <tr>
      <td>CampaignId</td>
      <td>optional</td>
      <td>string</td>
      <td>The Campaign Id specified when the deployment was created, an empty string if none was specified.</td>
    </tr>
    <tr>
      <td>ScheduledDate</td>
      <td>required</td>
      <td>date</td>
      <td>The date the deployment has been scheduled to send.</td>
    </tr>
    <tr>
      <td>RequestedDate</td>
      <td>required</td>
      <td>date</td>
      <td>The date the deployment has been originally requested to be sent</td>
    </tr>
    <tr>
      <td>TrackOpens</td>
      <td>required</td>
      <td>boolean</td>
      <td>true/false</td>
    </tr>
    <tr>
      <td>Notes</td>
      <td>optional</td>
      <td>string</td>
      <td>Optional user-specified text that is set when the deployment is created.</td>
    </tr>
    <tr>
      <td>Status</td>
      <td>required</td>
      <td>string</td>
      <td>The current status of the deployment. Valid values are : ‘Cancelled’, ‘New’, ‘Sending’,’Scheduled’,’Sent’,’Waiting Review’,’Not Accepted’,’Accepted’,’Submitted’, and ‘Approved’.</td>
    </tr>
    <tr>
      <td>TotalClicks</td>
      <td>required</td>
      <td>integer</td>
      <td>Total number of clicks registered for this deployment.</td>
    </tr>
    <tr>
      <td>TrackId</td>
      <td>required</td>
      <td>string</td>
      <td>The tracking number used to identify the deployment.</td>
    </tr>
    <tr>
      <td>CreatedBy</td>
      <td>required</td>
      <td>string</td>
      <td>The Omail account UserId or service that created the deployment.</td>
    </tr>
    <tr>
      <td>CreatedDate</td>
      <td>required</td>
      <td>date</td>
      <td>The date the deployment was created.</td>
    </tr>
    <tr>
      <td>RecipientCount</td>
      <td>required</td>
      <td>integer</td>
      <td>The number of recipients being deployed to.</td>
    </tr>
    <tr>
      <td>IsFiltered</td>
      <td>required</td>
      <td>boolean</td>
      <td>true/false</td>
    </tr>
    <tr>
      <td>ModificationHistory</td>
      <td>required</td>
      <td>array</td>
      <td>An array of objects that hold information regarding changes that have been made to the deployment.</td>
    </tr>
    <tr>
      <td>Testers</td>
      <td>optional</td>
      <td>array</td>
      <td>An array of json objects. Each object contains deployment tester information: First Name, Last Name, and Email Address.</td>
    </tr>
    <tr>
      <td>DeploymentTypeId</td>
      <td>required</td>
      <td>integer</td>
      <td>The Deployment Type Identifier in the Omail system. The&nbsp;<a title="Brand Comprehensive Lookup Service" href="https://main.omeda.com/knowledge-base/api-brand-comprehensive-lookup-service/">Cross Reference API</a>&nbsp;can be used to see all available deployment types for a given brand.</td>
    </tr>
    <tr>
      <td>DeploymentTypeDescription</td>
      <td>required</td>
      <td>string</td>
      <td>The Deployment Type description in the Omail system. The&nbsp;<a title="Brand Comprehensive Lookup Service" href="https://main.omeda.com/knowledge-base/api-brand-comprehensive-lookup-service/">Cross Reference API</a>&nbsp;can be used to see all available deployment types for a given brand.</td>
    </tr>
    <tr>
      <td>DeploymentDesignation</td>
      <td>required</td>
      <td>string</td>
      <td>The deployment designation.</td>
    </tr>
    <tr>
      <td>ReloadOnqQueryBeforeFinalDeployment</td>
      <td>required</td>
      <td>boolean</td>
      <td>Whether the deployment is set to re-execute an assigned OnQ query, when applicable.</td>
    </tr>
    <tr>
      <td>BillingCategoryCode</td>
      <td>optional</td>
      <td>string</td>
      <td>8 characters billing category if assigned to deployment</td>
    </tr>
  </tbody>
</table>
`);
