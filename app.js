const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var cookieParser = require('cookie-parser');

// set the view engine
app.set('view engine', 'pug');

// test express where the static files are kept
app.use(express.static('public'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

// Set up the database
require('./models/db.js');


//Route set up
var routes = require('./routes/routes.js');
app.use('/',routes);


var identityKey = 'skey';
app.use(session({
	name: identityKey,
	secret: 'yueruc',  
	store: new FileStore(), 
	saveUninitialized: false, 
	resave: false,  
	cookie: {
		maxAge: 1000 * 1000  
	}
	
}));



//Start the server
app.listen(PORT, function() {
    console.log(`Express serving at port ${PORT}`);
});

