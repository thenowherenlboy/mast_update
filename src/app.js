const path = require('path');
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const utils = require('./utils');

const viewPath = path.join(__dirname, '../routes/views/');
const partialsPath = path.join(__dirname,'../routes/partials/');

const app = express();

const port = process.env.PORT || 3000;

app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

// static files

app.use(express.static(path.join(__dirname, '../public/')));

// routes

app.get('/', (req, res) => {
    res.render('index', {
        title: 'MAST Home'
    });
});

app.get('/picker', (req, res) => {
    
    res.render('picker' , {
        title: 'Module Picker'
    });
    
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About MAST'
    });
});

app.get('/terms', (req, res) => {
    res.render('terms', {
        title: 'Terms of Use'
    });
});

app.get('/map', (req, res) => {
    res.render('map', {
        title: 'Site Map'
    });
});

app.listen(port, () => {
    console.log('Server up on port ' + port);
});



