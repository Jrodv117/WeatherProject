const { response } = require('express');
const express = require('express');
const https = require('https');

const app = express();

app.get('/', (req, res) => {
	//storing the url inside a variable named url for ease of use
	const url =
		'https://api.openweathermap.org/data/2.5/weather?q=Denver&appid=1a4a046cf6908026293343eb6fa7250b&units=imperial';
	// using nodes native https module to get a response from the url
	https.get(url, (urlresponse) => {
		// taking the url response and getting the data from in
		urlresponse.on('data', (data) => {
			//console logs data which returns a ton of hexadecimals
			// console.log(data);
			// using JSON.parse and passing data so we get back a js object and not just hexadecimal data
			const weatherData = JSON.parse(data);
			//console logs weatherData and returns a js object
			// console.log(weatherData);
			// takes a specific piece of data from weatherData thats stored in .main.temp
			const temp = weatherData.main.temp;
			//console log to make sure we have the correct piece of data
			// console.log(temp);
			// grabs weather description from weather data
			const weatherDescription = weatherData.weather[0].description;
			// console.logs that description to make sure we have the right piece of data
			console.log(weatherDescription);
		});
	});
	// res.send(__dirname + '/index.html');
	res.send('running');
});

app.listen(3000, function () {
	console.log('server is running on port 3000');
});
