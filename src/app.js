const path = require('path');
const express = require('express');
const hbs = require('hbs');

const viewPath = path.join(__dirname, '../routes/views/');
const partialsPath = path.join('../routes/partials/');

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
        title: 'Module Selector'
    });
});

app.listen(port, () => {
    console.log('Server up on port ' + port);
});



