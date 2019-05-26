const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//creating Schema for news
const newsSchema = new Schema(
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
const userSchema = new Schema(
    {
        username: String,
        password: String,
        preference: [String],
        likedNews: [{type: Schema.Types.ObjectId, ref: "news"}]
    }
);

// const commentSchema = new Schema(
//     {
//         content: String,

//     }
// );

mongoose.model('users', userSchema);
mongoose.model('news',newsSchema);
