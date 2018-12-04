// set up ========================
const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
const { google } = require('googleapis');
const path = require('path');

// configuration =================
const port = process.env.PORT || 3000;

const app = express();
app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(bodyParser.urlencoded({ 'extended': 'true' }));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

// main route
app.get('/alums', (req, res) => {
  fs.readFile('credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    authorize(JSON.parse(content), findAllAlums, res);
  });
});

// catch-all
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// listen on port
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

/**
 * Authorize call to Google API (code courtesy of Google Sheets docs)
 * @param {Object} credentials 
 * @param {Function} callback 
 * @param {Object} res 
 */
function authorize(credentials, callback, res) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // finish setting up credentials, call callback
  var token = {
    access_token: process.env.access_token,
    refresh_token: process.env.refresh_token,
    scope: 'https://www.googleapis.com/auth/spreadsheets.readonly',
    token_type: 'Bearer',
    expiry_date: process.env.expiry_date
  };

  oAuth2Client.setCredentials(token);
  callback(oAuth2Client, res);
}

/**
 * Find all alumni via a call to Google Sheets API. Send response
 * to client via callback when done.
 * @param {Object} auth 
 * @param {Object} res 
 */
function findAllAlums(auth, res) {
  const sheets = google.sheets({version: 'v4', auth});
  sheets.spreadsheets.values.get({
    spreadsheetId: '1alP9t4yeCx537NEISGLjpijIeUmisUqAh-LcPQCSUyA',
    range: 'Alumni Info!B2:K245',
  }, (err, res2) => {
    if (err) res.status(500);
    res.status(200).send(res2.data.values);
  });
}

// Put all alumni info into one string (for ease of printing)
function printAlumInfo(row) {
  var res = "";
  row.forEach((attr) => {
    res += attr === undefined ? " " : attr + " ";
  });
  return res;
}
