const mongoose = require('mongoose');

//creating Schema for news
const newsSchema = mongoose.Schema(
    {
        id: String,
        description: String,
        url: String,
        category: String,
        dates: Date,
        imageurl: String
    }
);

//create Schema for users
const userSchema = mongoose.Schema(
    {
        username: String,
        password: String,
        preference: [String],
        likedNews: [{
            "news_id":String,
            "news_description": String,
            "news_category": String
        }]
    }
);

mongoose.model('users', userSchema);
mongoose.model('news',newsSchema);
