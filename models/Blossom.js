const mongoose = require('mongoose');

const newsSchema = mongoose.Schema(
    {
        category: String,
        title: String,
        length: String,
        dates: Date
    }
);

const userSchema = mongoose.Schema(
    {
        username: String,
        password: String,
        preference: [String]
        //entertainment, sport, politics, technology, lifestyle, traval, Finance
    }
);

mongoose.model('users', userSchema);
mongoose.model('fakenews',newsSchema);