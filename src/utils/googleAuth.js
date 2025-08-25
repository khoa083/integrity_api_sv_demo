const { google } = require('googleapis');

async function getGoogleAuthClient(credentials) {
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/playintegrity'],
  });
  return await auth.getClient();
}

module.exports = { getGoogleAuthClient };
