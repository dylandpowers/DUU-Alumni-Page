# DUU Alumni Database
This is a simple Angular web page to grab the DUU alumni spreadsheet from google sheets and display the data in a table. The web app uses [ExpressJS](https://expressjs.com/) as the back-end framework for `Node.js`, and uses AngularJS on the front end. The app is hosted with [Heroku](https://www.heroku.com/).

### How to access it
Access the webpage by going to [duualumni.herokuapp.com](duualumni.herokuapp.com). The login for Heroku is the same as the login for the gmail; see the CTO for details.

### How it works
The app makes use of Google's Sheets API in order to grab the data from Google Drive. The document is running under duudevops@gmail.com, and continues to get populated with a Google Form. The application makes use of Google's `OAuth2` in order to authenticate the request, but it can generate a perpetual token that we have stored on Heroku in an environment variable. Specifically, there are 3 environment variables that must be maintained in Heroku: `access_token`, `refresh_token`, and `expiry_date`. If for some reason the token expires, delete `token.json` and run `node SpreadsheetService.js`, which will re-run the Auth application and generate a new token (follow the steps at the command line).

After authenticating, the app makes a call to the Sheets API to get the values out of the spreadsheet. Afterwards, the server sends the data to the client which populates a table with the returned data. 

### Improvements Needed
* The UI looks horrible. It's currently just a simple [Bootstrap](https://getbootstrap.com/) table with little to no styling. If someone who is competent at front-end dev could please take a look, that would be awesome.
* More flexible token generation system. I'm not sure if the tokens actually expire (i.e. it's way past `expiry_date` and everything still works fine), but I anticipate that they will one day. 

### Testing
Test the web page by running `node server.js` and then navigating to `http://localhost:3000` in your browser.
