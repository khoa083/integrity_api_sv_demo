const { getGoogleAuthClient } = require('../utils/googleAuth');
const { google } = require('googleapis');

async function verifyIntegrity(req, res, next) {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: 'Missing request body' });
    }
    if (!process.env.GOOGLE_CREDENTIALS) {
      return res.status(500).json({ error: 'Google credentials not configured' });
    }
    const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
    const client = await getGoogleAuthClient(credentials);
    const playIntegrity = google.playintegrity({ version: 'v1', auth: client });
    const response = await playIntegrity.v1.decodeIntegrityToken({
      packageName: process.env.PACKAGE_NAME,
      requestBody: req.body,
    });
    const verdict = response.data.tokenPayloadExternal;
    res.status(200).json(verdict);
  } catch (error) {
    next(error);
  }
}

module.exports = { verifyIntegrity };
