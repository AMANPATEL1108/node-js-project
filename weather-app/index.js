const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();

const API_KEY = 'c0a83d5ce9098cb4e60f927c1887748f'; // Replace with your API key
const port = 3022;

app.use(express.urlencoded({ extended: true })); // Middleware to parse form data

app.get('/', function (req, res) {
  // Create an HTML form for entering a city name
  const form = `
    <html>
      <body>
        <form action="/weather" method="post">
          <label for="city">Enter a City Name:</label>
          <input type="text" name="city" id="city" required>
          <button type="submit">Get Weather</button>
        </form>
      </body>
    </html>
  `;

  res.send(form);
});

app.post('/weather', function (req, res) {
  const city = req.body.city;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

  axios
    .get(url)
    .then(response => {
      const data = response.data;
      const cityName = data.name;
      const temperature = data.main.temp;
      const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString();
      const message = `City Name: ${cityName}<br>Temperature: ${temperature}&deg;C<br>Sunset Time: ${sunsetTime}`;

      // Create an HTML response with a styled output box
      const htmlResponse = `
        <html>
          <head>
            <style>
              #container {
                border: 2px solid #333;
                padding: 20px;
                text-align: center;
                max-width: 400px;
                margin: 0 auto;
                background-color: #f0f0f0;
              }
            </style>
          </head>
          <body>
            <div id='container'>
              <h1>${message}</h1>
            </div>
          </body>
        </html>
      `;

      res.send(htmlResponse);
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Error occurred');
    });
});

app.listen(port, function () {
  console.log(`Application is running on port ${port}`);
});
