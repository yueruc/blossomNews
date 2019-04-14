const mongoose = require('mongoose');

//creating Schema for news
const newsSchema = mongoose.Schema(
    {
        category: String,
        title: String,
        length: String,
        dates: Date
    }
);

//create Schema for users
const userSchema = mongoose.Schema(
    {
        username: String,
        password: String,
        preference: [String]
    }
);

mongoose.model('users', userSchema);
mongoose.model('fakenews',newsSchema);
