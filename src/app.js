const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
	res.status(200).send('API is running.');
});
app.get('/favicon.ico', (req, res) => res.status(204).end());
app.get('/favicon.png', (req, res) => res.status(204).end());

const integrityRoute = require('./routes/integrity');
app.use('/', integrityRoute);

app.use((err, req, res, next) => {
	console.error('Unhandled error:', err);
	if (!err.code) {
		err.message = 'Internal Server Error';
		err.code = 500;
	}
	res.status(err.code).json({ error: err.message });
});

module.exports = app;

