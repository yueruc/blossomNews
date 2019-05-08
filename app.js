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

//Start the server
app.listen(PORT, function() {
    console.log(`Express serving at port ${PORT}`);
});

