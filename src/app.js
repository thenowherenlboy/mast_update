
// this site uses the Express framework for route handling
// and Handlebars for templating.

const path = require('path');
const express = require('express');
const hbs = require('hbs');
const cors = require('cors');

const  { getContent } = require('./utils');

const viewPath = path.join(__dirname, '../routes/views/');
const partialsPath = path.join(__dirname,'../routes/partials/');

const app = express();

var modPath = path.join(__dirname,'../modules/');
if (process.platform === 'win32') {
    modPath = path.win32.normalize(modPath);
} else {
    modPath = path.normalize(modPath);
}

const port = process.env.PORT || 3000;

app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

// static files

app.use(express.static(path.join(__dirname, '../public/')));

app.use(express.static(modPath));


// routes

// Home page
app.get('/', (req, res) => {
    console.log(modPath);
    res.render('index', {
        title: 'MAST Home'
    });
});

// Selection page
app.get('/picker', (req, res) => {
    var title;
    var content; 

    if (!req.query.folder){ 
        content = getContent(modPath,'');
        title = 'Module Selector';
    } else {
        var sub = req.query.folder;
        title = sub; // .replace(/\//g,' ');
        
        content = getContent(modPath + sub + '/', sub + '/');
        
    }
    res.render('picker' , {
        title,
        content
    });
    
});

// About page
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About MAST'
    });
});

// TOS page
app.get('/terms', (req, res) => {
    res.render('terms', {
        title: 'Terms of Use'
    });
});


// Site map page may be added in the future if 
// desired.

/* 
//app.get('/map', (req, res) => {
//     res.render('map', {
//         title: 'Site Map'
//     });
// });

// app.get('/modules/*', (res, req) => {
//     if(!res.headersSent) {
//         console.log ('Headers not sent?');
//         res.set('Content-Type','text/html');
//     }
// }); 

*/

app.listen(port, () => {
    console.log('Server up on port ' + port);
});