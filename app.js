const express = require('express');
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

// Set up the database
require('./models/db.js');


//Route set up
var routes = require('./routes/routes.js');
app.use('/',routes);
  
//Start the server
app.listen(PORT, function() {
    console.log(`Express serving at port ${PORT}`);
});

