const mongoose = require("mongoose");

//copy from CONNECT (MongoDB Atlas)
const dbURI =
    "mongodb+srv://Johnson:19971101Rym@cluster0-v1qg0.mongodb.net/";

const options = {
    useNewUrlParser: true,
    dbName: "News"
};

mongoose.connect(dbURI, options).then(
    () => {
        console.log("Database connection established!");
    },
    err => {
        console.log("Error connecting Database instance due to: ", err);
    }
);

require('./Blossom.js');


