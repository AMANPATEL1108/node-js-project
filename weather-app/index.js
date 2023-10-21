const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();

const API_KEY = 'c0a83d5ce9098cb4e60f927c1887748f'; // Replace with your API key
const port = 3022;

app.get('/', function (req, res) {
  const address = req.query.address;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${address}&units=metric&appid=${API_KEY}`;

  axios
    .get(url)
    .then(response => {
      const data = response.data;
      const cityName = data.name;
      const temperature = data.main.temp;
      const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString();
      const message = `City Name: ${cityName}<br>Temperature: ${temperature}&deg;C<br>Sunset Time: ${sunsetTime}`;

      res.send(`<html><body><div id='container'><h1>${message}</h1></div></body></html>`);
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Error occurred');
    });
});

app.listen(port, function () {
  console.log(`Application is running on port ${port}`);
});
