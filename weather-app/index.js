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
  <link rel="stylesheet" type="text/css" href="styles.css">
  <style>
    body {
      font-family: 'Roboto', sans-serif;
      background: linear-gradient(135deg, #1e3c72, #2a5298);
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }

    .container {
      background: rgba(255, 255, 255, 0.9);
      box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
      padding: 30px;
      border-radius: 20px;
      text-align: center;
      max-width: 400px
     
    }

    h1 {
      color: #1e3c72;
      font-family: 'Arial', sans-serif;
      font-size: 2.5rem;
    }

    label {
      font-weight: bold;
      color: #2a5298;
      font-family: 'Arial', sans-serif;
      font-size: 1.2rem;
    }

    input[type="text"] {
      padding: 12px;
      width: 100%;
      margin: 15px 0;
      background-color: #f0f0f0;
      border: 2px solid #2a5298;
      color: #333;
      border-radius: 10px;
      font-size: 1.2rem;
    }

    button {
      background: linear-gradient(135deg, #fd5e53, #f7a78f);
      color: #fff;
      padding: 15px 30px;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      font-weight: bold;
      font-family: 'Arial', sans-serif;
      font-size: 1.2rem;
      transition: background 0.3s ease;
    }

    button:hover {
      background: linear-gradient(135deg, #f7a78f, #fd5e53);
    }

    button:focus {
      outline: none;
      box-shadow: 0 0 5px rgba(255, 94, 83, 0.7);
    }

    button:active {
      transform: scale(0.98);
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
        <!DOCTYPE html>
<html>
  <head>
    <style>
      body {
        font-family: 'Arial', sans-serif;
        background: linear-gradient(135deg, #FF6B6B, #6B6BFF);
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0;
      }
      #container {
        background-color: #E6E6E6;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
        padding: 20px;
        border-radius: 10px;
        text-align: center;
        max-width: 400px;
      }
      h1 {
        color: #333;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
      }
    </style>
  </head>
  <body>
    <div id='container' >
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
