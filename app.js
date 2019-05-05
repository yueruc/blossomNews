const express = require('express');
const app = express();
var bodyParser = require('body-parser');

// set the view engine
app.set('view engine', 'pug');

// test express where the static files are kept
app.use(express.static('public'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

// Set up the database
require('./models/db.js');


//Route set up
var routes = require('./routes/routes.js');
app.use('/',routes);

//Displaying mainpage
app.get('/', (req, res) => {

    res.render('index');
  });

//Render the rest pages
app.get('/art', (req, res) => {

    res.render('art.pug');
});

app.get('/entertainment', (req, res) => {

    res.render('entertainment.pug');
});

app.get('/finance', (req, res) => {

    res.render('finance.pug');
});

app.get('/politics', (req, res) => {

    res.render('politics.pug');
});

app.get('/sport', (req, res) => {

    res.render('sport.pug');
});

app.get('/tech', (req, res) => {

    res.render('tech.pug');
});

app.get('/travel', (req, res) => {

    res.render('travel.pug');
});

app.get('/weather', (req, res) => {

    res.render('weather.pug');
});

//Start the server
app.listen(PORT, function() {
    console.log(`Express serving at port ${PORT}`);
});

