const mongoose = require('mongoose');
const User = mongoose.model('users');
const News = mongoose.model('news');
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('abf08a911e534e629682c3098dc1b9ca');


//the main Page
let mainPage = function(req, res) {
    res.render('index',{
        title: "BlossomNews"
    });
};

// Push 4 users and save to database.
let createAdmin = function(req, res) {
    let user = new User(
        {
            "username": req.body.username,
            "password": req.body.password,
            "preference": req.body.preference
        }
    );

    user.save(function(err, newUser) {
        if (!err) {
            res.json(newUser);
        } else {
            res.sendStatus(400);
        }
    });
};

//find all users
let allUsers = function(req, res) {
    User.find(function(err, allUsers) {
        if (!err) {
            res.send(allUsers);
        } else {
            res.sendStatus(400);
        }
    });
};

let login = function(req,res){
    res.render('login',{
        title: "login"
    });
};


//check logIn system with username & password
let checkUser = function(req, res){
    var userName = req.body.username;
    var passWord = req.body.password;

    User.findOne({username: userName, password: passWord}, function(err, user){
        if(!err){
            if(user){
                res.send("Successfully LogIn");
            }else{
                res.send("Fail to LogIn");
            }
        }else{
            res.sendStatus(400);
        }
        
    });

}


//check one userinfomation by username
let getinfoByUsername = function(req, res) {
    var userName = req.params.username;
    User.find({username:userName}, function(err, user) {
        if (user) {
            res.json(user);
        }else{
            res.send("No user Found");
        }
    });
};





// first create news
let createNews = function(req, res) {
  
    let news = new News(
        {
            "id": req.body.id,
            "description": req.body.description,
            "url": req.body.url,
            "category": req.body.category,
            "dates": req.body.dates
        }
    );
    
    news.save(function(err, newNews) {
        if (!err) {
            res.json(newNews);
        } else {
            res.sendStatus(400);
        }
    });

};

//check all the news
let allNews = function(req, res) {
    News.find(function(err, allNews) {
        if (!err) {
            res.send(allNews);
        } else {
            res.sendStatus(400);
        }
    });
};

let addNews = function(req, res){

    newsapi.v2.sources({
        category: 'health'
    }).then(response => {
        let newsArray = response.sources;
        console.log(response.sources);
        for (let i = 0; i < 9; i++) {
            let news = new News(
                {
                    "id": newsArray[i].id,
                    "description": newsArray[i].description,
                    "url": newsArray[i].url,
                    "category": newsArray[i].category
                    //"dates": new.dates
                }
            );
            news.save(function(err, newnews) {
                if (err) {
                    res.sendStatus(400);
                }
            });
        }
    });
};

//find news by category
var findOneCategoryNews = function(req, res) {
    var newscategory = req.params.category;
    News.find({category:newscategory}, function(err, news) {
        if (err) {
            res.send("No matching Found!");
        }else{
            //res.send(fakenews);
            res.render('news', {
                title: newscategory,
                news: news
            });
        }
    });
};



//get newest news
var getNewestNews = function(req, res) {
    var newstime = req.params.dates;
    News.find({dates:newstime}, function(err, news){
        if (newstime>=2018-1-1 || !err){
            res.send(news);
        }else{
            res.sendStatus(500);
        }

    });

}



module.exports.mainPage = mainPage;

//user
module.exports.login = login;
module.exports.createAdmin = createAdmin;
module.exports.allUsers = allUsers;
module.exports.checkUser = checkUser;
module.exports.getinfoByUsername = getinfoByUsername;
//News
module.exports.allNews = allNews;
module.exports.createNews = createNews;
module.exports.addNews = addNews;
module.exports.findOneCategoryNews = findOneCategoryNews;
module.exports.getNewestNews = getNewestNews;
