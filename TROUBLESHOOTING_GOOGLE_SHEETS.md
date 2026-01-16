# Troubleshooting Google Sheets Integration

## Issue: Form submits but data doesn't appear in Google Sheets

### Step 1: Check Browser Console

1. Open your website
2. Open browser DevTools (F12 or Right-click → Inspect)
3. Go to the "Console" tab
4. Fill out and submit the RSVP form
5. Look for these log messages:
   ```
   Submitting RSVP to: https://script.google.com/...
   Form data: { name: "...", email: "...", ... }
   RSVP fetch completed
   ```

If you see any errors, note them down.

### Step 2: Check Google Apps Script Execution Logs

1. Go to your Google Sheet
2. Click **Extensions** → **Apps Script**
3. Click **Executions** (clock icon on the left sidebar)
4. Look for recent executions - they should show as either:
   - ✅ Completed (data was received successfully)
   - ❌ Failed (shows error message)

If you see failed executions, click on them to see the error details.

### Step 3: Update Your Google Apps Script

Your old quiz sent different fields (`team`, `score`) that the new form doesn't use. You need to update the script:

1. Go to your Google Sheet
2. Click **Extensions** → **Apps Script**
3. Replace ALL the code with this:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Log incoming data for debugging
    Logger.log('Received data: ' + JSON.stringify(e.parameter));

    // Get form data from the new RSVP form
    var name = e.parameter.name || '';
    var email = e.parameter.email || '';
    var phone = e.parameter.phone || '';
    var attending = e.parameter.attending || '';
    var essay = e.parameter.essay || '';
    var timestamp = e.parameter.timestamp || new Date().toISOString();

    // Add new row with data
    sheet.appendRow([timestamp, name, email, phone, attending, essay]);

    Logger.log('Successfully added row to sheet');

    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'success',
      'message': 'RSVP submitted successfully'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log('Error: ' + error.toString());

    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput("Wedding RSVP Form Handler - Active");
}

// Test function - you can run this to test the script
function testScript() {
  var testData = {
    parameter: {
      name: "Test User",
      email: "test@example.com",
      phone: "+1234567890",
      attending: "yes",
      essay: "",
      timestamp: new Date().toISOString()
    }
  };

  var result = doPost(testData);
  Logger.log('Test result: ' + result.getContent());
}
```

4. Click **Save** (disk icon)
5. **IMPORTANT**: You must redeploy after changing the code:
   - Click **Deploy** → **Manage deployments**
   - Click the pencil icon ✏️ next to your active deployment
   - Under "Version", select **New version**
   - Add a description like "Updated for new RSVP form"
   - Click **Deploy**
   - Copy the new Web App URL if it changed

### Step 4: Update Your Google Sheet Headers

Make sure your Google Sheet has these column headers in row 1:

| A | B | C | D | E | F |
|---|---|---|---|---|---|
| Timestamp | Name | Email | Phone | Attending | Essay |

### Step 5: Test the Connection

1. In Google Apps Script, run the `testScript` function:
   - Select `testScript` from the function dropdown
   - Click **Run** (▶️ button)
   - Grant permissions if prompted
   - Check **Executions** to see if it succeeded
   - Check your Google Sheet - you should see a test row appear

2. If the test works, try submitting a real form from your website

### Step 6: Verify Deployment Settings

1. In Google Apps Script, click **Deploy** → **Manage deployments**
2. Verify these settings:
   - **Execute as**: Me (your@email.com)
   - **Who has access**: Anyone
   - Status should show "Active"

### Common Issues

**Issue**: "Authorization required" or permission errors
- **Fix**: Redeploy the script and grant all permissions when prompted

**Issue**: Data appears but in wrong columns
- **Fix**: Check that your sheet headers match exactly: Timestamp, Name, Email, Phone, Attending, Essay

**Issue**: No executions appear in the log
- **Fix**: Verify the Web App URL in `src/components/RSVPSection.jsx` matches your deployment URL exactly (should end in `/exec`)

**Issue**: Old data structure still being sent
- **Fix**: Hard refresh your website (Ctrl+Shift+R or Cmd+Shift+R) to clear the cache

### Testing Checklist

- [ ] Google Apps Script code updated to new version
- [ ] Script redeployed as "New version"
- [ ] Sheet has correct headers (Timestamp, Name, Email, Phone, Attending, Essay)
- [ ] `testScript()` function runs successfully
- [ ] Test row appears in Google Sheet
- [ ] Website form submits without console errors
- [ ] Real submission data appears in Google Sheet

### Still Not Working?

Check the Google Apps Script execution logs (**Executions** tab) for specific error messages and share them for further debugging.
