const load = require('../utils/from-four-col');

module.exports = load('customer-subscription-elements', `
<table>
  <tbody>
    <tr>
      <th>Element Name</th>
      <th>Optional?</th>
      <th>Data Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>Id</td>
      <td>no</td>
      <td>integer</td>
      <td>unique subscription identifier</td>
    </tr>
    <tr>
      <td>ProductId</td>
      <td>no</td>
      <td>integer</td>
      <td>Explicit Omeda product id for the product being requested.&nbsp;<b>Only Magazines (productType=1) and
          Newsletters (productType=2) will be returned via this API. Use the&nbsp;<a title="Opt In/Out Lookup Service"
            href="https://main.omeda.com/knowledge-base/api-email-opt-in-out-lookup-service/">OptLookup API</a>&nbsp;for
          Email Deployment updates (productType=5).</b></td>
    </tr>
    <tr>
      <td>RequestedVersion</td>
      <td>no</td>
      <td>String</td>
      <td>“P” for print, “D” for digital, “B” for both</td>
    </tr>
    <tr>
      <td>RequestedVersionCode</td>
      <td>no</td>
      <td>String</td>
      <td>“P” for print, “D” for digital, “B” for both</td>
    </tr>
    <tr>
      <td>ActualVersionCode</td>
      <td>no</td>
      <td>String</td>
      <td>“P” for print, “D” for digital, “B” for both</td>
    </tr>
    <tr>
      <td>Quantity</td>
      <td>yes</td>
      <td>integer</td>
      <td>the number of subscriptions requested</td>
    </tr>
    <tr>
      <td>DataLockCode</td>
      <td>yes</td>
      <td>Integer</td>
      <td>0 = standard / not locked, 1 = locked (subscription cannot be updated while locked)</td>
    </tr>
    <tr>
      <td>Receive</td>
      <td>no</td>
      <td>short (boolean)</td>
      <td>0 = subscription not received, 1 = subscription received NOTE: this is the primary way of determining whether
        a customer is or is not CURRRENTLY receiving a product. Customers actively receiving the product currently will
        have a ‘1’. Someone who is no longer currently receiving the product (but has in the past) will have a ‘0’.</td>
    </tr>
    <tr>
      <td>MarketingClassId</td>
      <td>yes</td>
      <td>String</td>
      <td>Indicates whether the subscription is active, controlled, paid, killed etc. This is related to the Marketing
        Class Description.</td>
    </tr>
    <tr>
      <td>MarketingClassDescription</td>
      <td>yes</td>
      <td>String</td>
      <td>Marketing Class description.</td>
    </tr>
    <tr>
      <td>DeploymentTypes</td>
      <td>yes</td>
      <td>array</td>
      <td>each DeploymentType element contains all deployment type and opt-in/opt-out information.</td>
    </tr>
    <tr>
      <td>ShippingAddressId</td>
      <td>yes</td>
      <td>Integer</td>
      <td>Internal ID of the postal address associated with this subscription.</td>
    </tr>
    <tr>
      <td>BillingAddressId</td>
      <td>yes</td>
      <td>Integer</td>
      <td>Internal ID of the billing address associated with this subscription.</td>
    </tr>
    <tr>
      <td>BillingName</td>
      <td>yes</td>
      <td>String</td>
      <td>Name on the credit card associated with this subscription.</td>
    </tr>
    <tr>
      <td>EmailAddressId</td>
      <td>yes</td>
      <td>Integer</td>
      <td>Internal ID of the email address associated with this subscription.</td>
    </tr>
    <tr>
      <td>ChangedDate</td>
      <td>no</td>
      <td>Date</td>
      <td>Date &amp; time record last changed. yyyy-MM-dd HH:mm:ss format. Example: 2010-03-08 21:23:34.</td>
    </tr>
    <tr>
      <td>Relationships</td>
      <td>yes</td>
      <td>Integer</td>
      <td>Each Relationship element contains the ID and Product Id associated to the complimentary products that were
        included with the subscription as part of a promotion or default offering.</td>
    </tr>
    <tr>
      <td>PaymentStatus</td>
      <td>yes</td>
      <td>Integer</td>
      <td>Payment status of the subscription, if it is a PAID subscription. This element will be omitted from response
        if there is no payment status associated with the subscription.&nbsp;<a
          title="Customer Subscription Lookup By Product"
          href="https://main.omeda.com/knowledge-base/api-customer-subscriptions-lookup-service/#additional-information">Payment
          Status Codes</a></td>
    </tr>
    <tr>
      <td>CreditBalance</td>
      <td>yes</td>
      <td>Decimal</td>
      <td>Amount, in USD, of remaining balance the subscriber owes for the subscription. Field will be omitted from
        response if there is no credit balance associated with the subscription.</td>
    </tr>
    <tr>
      <td>Amount</td>
      <td>yes</td>
      <td>Decimal</td>
      <td>Amount, in USD, the subscriber paid for the subscription. Field will be omitted from response if there is no
        amount associated with the subscription.</td>
    </tr>
    <tr>
      <td>LastPaymentDate</td>
      <td>yes</td>
      <td>Date</td>
      <td>Returns the date of the most recent payment that was received for a subscription.</td>
    </tr>
    <tr>
      <td>LastPaymentAmount</td>
      <td>yes</td>
      <td>Decimal</td>
      <td>Returns amount in USD of the most recent payment for a subscription.</td>
    </tr>
    <tr>
      <td>LastIssueEarnedDescription</td>
      <td>yes</td>
      <td>String</td>
      <td>Short description of the issue. This is sometimes represented as a short date, sometimes as a number. Field
        will be omitted from response if there is no issue description associated with the subscription.</td>
    </tr>
    <tr>
      <td>LastIssueEarnedDate</td>
      <td>yes</td>
      <td>Date</td>
      <td>Last issue date.</td>
    </tr>
    <tr>
      <td>FirstIssueEarnedDescription</td>
      <td>yes</td>
      <td>String</td>
      <td>Short description of the issue. This is sometimes represented as a short date, sometimes as a number. Field
        will be omitted from response if there is no issue description associated with the subscription.</td>
    </tr>
    <tr>
      <td>FirstIssueEarnedDate</td>
      <td>yes</td>
      <td>Date</td>
      <td>Date of the first issue.</td>
    </tr>
    <tr>
      <td>Term</td>
      <td>yes</td>
      <td>Integer</td>
      <td>Length of the subscription using the product’s unit of measure. Field will be omitted from response if there
        is no term associated with the subscription.</td>
    </tr>
    <tr>
      <td>IssuesRemaining</td>
      <td>yes</td>
      <td>Integer</td>
      <td>Projected number of issues remaining. Field will be omitted from response if there are no issues remaining
        associated with the subscription.</td>
    </tr>
    <tr>
      <td>CopiesRemaining</td>
      <td>yes</td>
      <td>Integer</td>
      <td>Projected number of copies remaining. Field will be omitted from response if there are no copies remaining
        associated with the subscription.</td>
    </tr>
    <tr>
      <td>IssueExpirationDate</td>
      <td>yes</td>
      <td>Date</td>
      <td>The projected expiration date for issue-based (print/digital) products. Date &amp; time record last changed.
        yyyy-MM-dd HH:mm:ss format. Example: 2010-03-08 21:23:34. Field will be omitted from response if there is no
        projected expiration date associated with the subscription.</td>
    </tr>
    <tr>
      <td>OrderDate</td>
      <td>yes</td>
      <td>Date</td>
      <td>The date that the most recent order was entered for this subscription. The Date &amp; time format: yyyy-MM-dd
        HH:mm:ss format. Example: 2010-03-08 21:23:34. Field will be omitted from response if there is no order date
        associated with the subscription.</td>
    </tr>
    <tr>
      <td>OriginalOrderDate</td>
      <td>yes</td>
      <td>Date</td>
      <td>The date that the first order was entered for this subscription. The Date &amp; time format: yyyy-MM-dd
        HH:mm:ss format. Example: 2010-03-08 21:23:34. Field will be omitted from response if there is no order date
        associated with the subscription.<br>Coming Soon</td>
    </tr>
    <tr>
      <td>ExpirationDate</td>
      <td>yes</td>
      <td>Date</td>
      <td>The expiration date for continuous-access (i.e. website, online access etc.) products. Date &amp; time record
        last changed. yyyy-MM-dd HH:mm:ss format. Example: 2010-03-08 21:23:34. Field will be omitted from response if
        there is no expiration date associated with the subscription.</td>
    </tr>
    <tr>
      <td>DeactivationDate</td>
      <td>yes</td>
      <td>Date</td>
      <td>This date can be used to determine if a Paid subscription has been given extended temporary access. The Date
        &amp; time format: yyyy-MM-dd HH:mm:ss format. Example: 2010-03-08 21:23:34. Field will be omitted from response
        if there is no deactivation date associated with the subscription.</td>
    </tr>
    <tr>
      <td>AutoRenewalCode</td>
      <td>yes</td>
      <td>int</td>
      <td>The code for if the subscription is an Auto Renewal. Valid Values are : 0 = Not Auto Renewal, 5 = Auto Charge,
        6 = Auto Bill Me on Invoice</td>
    </tr>
    <tr>
      <td>NumberOfInstallments</td>
      <td>yes</td>
      <td>Integer</td>
      <td>The number of installments on a Paid Subscription. Default is always 1, meaning the account is paid all at
        once. Anything greater that 1 is the number of expected payments.</td>
    </tr>
    <tr>
      <td>InstallmentCode</td>
      <td>yes</td>
      <td>Integer</td>
      <td>The type of Installment Billing Code. Valid Values: 1=Installment Bill Me, 2=Installment Auto Charge)</td>
    </tr>
    <tr>
      <td>Voucher</td>
      <td>no</td>
      <td>string</td>
      <td>this will only be returned if the product was paid for with a Voucher.</td>
    </tr>
    <tr>
      <td>DonorId</td>
      <td>no</td>
      <td>Integer</td>
      <td>The Omeda Customer Id of the Donor who purchased the this Subscription, this will only be returned if the
        subscription was a Gift Subscription</td>
    </tr>
    <tr>
      <td>GiftMessage</td>
      <td>no</td>
      <td>String</td>
      <td>The Gift Message if it was included at time of gift purchase, this will only be returned if the subscription
        was a Gift Subscription</td>
    </tr>
    <tr>
      <td>GiftSentDate</td>
      <td>no</td>
      <td>Date</td>
      <td>The Date the gift was sent, this will only be returned if the subscription was a Gift Subscription</td>
    </tr>
    <tr>
      <td>VerificationDate</td>
      <td>yes</td>
      <td>Date</td>
      <td>Verification Date of subscription.</td>
    </tr>
    <tr>
      <td>VerificationAge</td>
      <td>no</td>
      <td>Integer</td>
      <td>Verification Age of subscription. (1, 2, 3, or 4 years. 4 years indicates 4 or more.) 1 is returned if the
        verification date is in the future or less than 1 year from the audit issue. 4 is return if verification date is
        4 *or more* years away from the audit issue.</td>
    </tr>
    <tr>
      <td>Status</td>
      <td>no</td>
      <td>Integer</td>
      <td>The Status represent the current state of the subscription (1 – Active, 2 – Pending, 3 – Expired, 4 –
        Cancelled, 5 – Graced, 6 – Standing Order)</td>
    </tr>
    <tr>
      <td>SourceId</td>
      <td>yes</td>
      <td>Integer</td>
      <td>SourceId represents the BPA Source (e.g. 23 = Personal direct request electronic [see
        DataSourceConstants.java])</td>
    </tr>
    <tr>
      <td>ClientOrderId</td>
      <td>no</td>
      <td>String</td>
      <td>Client transaction id for the order</td>
    </tr>
    <tr>
      <td>RenewalCount</td>
      <td>yes</td>
      <td>Integer</td>
      <td>Number of times a subscription has been renewed</td>
    </tr>
    <tr>
      <td>PremiumCode</td>
      <td>no</td>
      <td>Integer</td>
      <td>Premium code id</td>
    </tr>
    <tr>
      <td>PremiumCodeDescription</td>
      <td>no</td>
      <td>String</td>
      <td>Description of Premium code</td>
    </tr>
  </tbody>
</table>
`);
