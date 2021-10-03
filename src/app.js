const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define the path for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlers engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Sean',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    helpText: 'This is some helpful text.',
    name: 'Sean',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    brand: 'Mazda',
    name: 'Sean',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    res.send({
      error: 'Please give the address',
    });
  }

  geocode(req.query.address, (error, geoData) => {
    if (error) {
      res.send({ error });
    }

    const { latitude, longitude, location } = geoData;
    forecast(latitude, longitude, (error, foreCastData) => {
      if (error) {
        res.send({ error });
      }

      res.send({
        foreCastData,
        location,
      });
    });
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    res.send({
      error: 'Please provide search term',
    });
  }

  res.send({
    products: [],
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Sean',
    errorMessage: 'Help article not found',
  });
});

app.get('/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Sean',
    errorMessage: 'Page not found',
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000.');
});
