const express = require('express');
const https = require('https');

const app = express();

app.get('/', function (req, res) {
	https.get();
	// res.send(__dirname + '/index.html');
	res.send('running');
});

app.listen(3000, function () {
	console.log('server is running on port 3000');
});
