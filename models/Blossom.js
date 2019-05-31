const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema(
    {
        content: String
    }
);

//creating Schema for news
const newsSchema = new Schema(
    {
        id: String,
        description: String,
        url: String,
        category: String,
        dates: Date,
        imageurl: String,
        comment: [{type: Schema.Types.ObjectId, ref: "comments"}],
        isLiked: Boolean
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

mongoose.model('users', userSchema);
mongoose.model('news',newsSchema);
mongoose.model('comments',commentSchema);
