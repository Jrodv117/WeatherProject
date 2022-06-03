const { response } = require('express');
const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => {
	//storing the url inside a variable named url for ease of use
	const query = req.body.cityName;
	const url =
		'https://api.openweathermap.org/data/2.5/weather?q=' +
		query +
		'&appid=1a4a046cf6908026293343eb6fa7250b&units=imperial';
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
			// console.log(weatherDescription);
			const icon = weatherData.weather[0].icon;
			const imageURL = 'http://openweathermap.org/img/wn/' + icon + '@2x.png';

			res.write('<p>the weather is currently ' + weatherDescription + '</p>');
			res.write(
				'<h1>The temperature in ' + query + ' is ' + temp + 'degrees</h1>'
			);
			res.write('<img src=' + imageURL + ' />');
			res.send();
		});
	});
});
app.listen(3000, function () {
	console.log('server is running on port 3000');
});
