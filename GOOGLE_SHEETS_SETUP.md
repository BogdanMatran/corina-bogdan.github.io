# Google Sheets RSVP Setup Instructions

Follow these steps to connect your RSVP form to Google Sheets:

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Wedding RSVPs" (or whatever you prefer)
4. In the first row, add these column headers:
   - Column A: `Timestamp`
   - Column B: `Name`
   - Column C: `Email`
   - Column D: `Phone`
   - Column E: `Attending`
   - Column F: `Essay`

## Step 2: Create Google Apps Script

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete any existing code
3. Copy and paste the following code:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Get form data
    var name = e.parameter.name;
    var email = e.parameter.email;
    var phone = e.parameter.phone;
    var attending = e.parameter.attending;
    var essay = e.parameter.essay || '';
    var timestamp = e.parameter.timestamp || new Date().toISOString();

    // Add new row with data
    sheet.appendRow([timestamp, name, email, phone, attending, essay]);

    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'success',
      'message': 'RSVP submitted successfully'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput("Wedding RSVP Form Handler");
}
```

4. Click **Save** (disk icon)
5. Name your project (e.g., "Wedding RSVP Handler")

## Step 3: Deploy as Web App

1. Click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **Web app**
4. Configure the deployment:
   - **Description**: "RSVP Form Handler" (or anything you like)
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
5. Click **Deploy**
6. **Review permissions** (if prompted):
   - Click **Review permissions**
   - Select your Google account
   - Click **Advanced** → **Go to [Project name] (unsafe)**
   - Click **Allow**
7. **Copy the Web App URL** - it will look like:
   ```
   https://script.google.com/macros/s/XXXXX.../exec
   ```

## Step 4: Update Your Website Code (Already Configured)

The website code is already configured with your Google Apps Script URL:
```javascript
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbygnuDB2N30apAVXHYMtuhC4nSlPNbEFeFKVFy1p4LUR-8pqwtRO5_Ep3hVCjJVqOs/exec';
```

If you need to change the URL in the future:
1. Open the file: `src/components/RSVPSection.jsx`
2. Find the `GOOGLE_SCRIPT_URL` constant near the top
3. Replace with your new Web App URL
4. Save the file

## Step 5: Test Your Form

1. Build and deploy your website
2. Submit a test RSVP
3. Check your Google Sheet - you should see the data appear!

## Troubleshooting

**Form submits but no data in sheet:**
- Make sure you deployed as "Anyone" can access
- Check that you granted all permissions
- Verify the URL is correct (should end in `/exec`)

**Permission errors:**
- Redeploy the script and grant permissions again
- Make sure "Execute as: Me" is selected

**Need to update the script later:**
- Make your changes in Apps Script
- Click **Deploy** → **Manage deployments**
- Click the pencil icon to edit
- Change the version to "New version"
- Click **Deploy**

## Your RSVP Data

All submissions will appear in your Google Sheet with:
- **Timestamp**: When they submitted
- **Name**: Guest's full name
- **Email**: Their email address
- **Phone**: Their phone number
- **Attending**: Whether they're attending (yes/no)
- **Essay**: Their explanation (only if attending = "no", minimum 300 words)

You can then:
- Sort and filter responses by attendance
- Count confirmed guests
- Export to Excel if needed
- Share the sheet with others
- Create charts/summaries
- Track who needs follow-up

## Need Help?

If you have any issues:
1. Check the Apps Script logs: **Executions** tab in Apps Script
2. Make sure your sheet has the correct column headers
3. Verify the deployment permissions are set to "Anyone"
