const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();

const API_KEY = ''; // Replace with your API key
const port = 3022;

app.use(express.urlencoded({ extended: true })); // Middleware to parse form data


app.get('/', function (req, res) {
  // Create an HTML form for entering a city name
  const form = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>Weather Information</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f7f7f7;
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
      }
      .container {
        background-color: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        padding: 20px;
        border-radius: 5px;
        text-align: center;
        max-width: 400px;
      }
      h1 {
        color: #333;
      }
      label {
        font-weight: bold;
      }
      input[type="text"] {
        padding: 5px;
        width: 100%;
        margin: 10px 0;
      }
      button {
        background-color: #007bff;
        color: #fff;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
      }
      button:hover {
        background-color: #0056b3;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Weather Information</h1>
      <form action="/weather" method="post">
        <label for="city">Enter a City Name:</label>
        <input type="text" name="city" id="city" required>
        <button type="submit">Get Weather</button>
      </form>
    </div>
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
              body {
                font-family: Arial, sans-serif;
                background-color: #f7f7f7;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
              }
              #container {
                background-color: #fff;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
                padding: 20px;
                border-radius: 5px;
                text-align: center;
                max-width: 400px;
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
