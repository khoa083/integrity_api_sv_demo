require('dotenv').config();
const express = require('express');
const { google } = require('googleapis');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('API is running.');
});

app.get('/favicon.ico', (req, res) => res.status(204).end());
app.get('/favicon.png', (req, res) => res.status(204).end());

app.post('/verify-integrity', async (req, res, next) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: 'Missing request body' });
    }

    if (!process.env.GOOGLE_CREDENTIALS) {
      return res.status(500).json({ error: 'Google credentials not configured' });
    }
    console.log('GOOGLE_CREDENTIALS env:', process.env.GOOGLE_CREDENTIALS);
    const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/playintegrity'],
    });
    const client = await auth.getClient();
    const playIntegrity = google.playintegrity({ version: 'v1', auth: client });

    const response = await playIntegrity.v1.decodeIntegrityToken({
      packageName: process.env.PACKAGE_NAME ,
      requestBody: req.body,
    });

    const verdict = response.data.tokenPayloadExternal;
    
    res.status(200).json(verdict);
  } catch (error) {
    next(error);
  }
});

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  if(!err.code) {
    err.message = 'Internal Server Error';
    err.code = 500
  }
  res.status(err.code).json({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
