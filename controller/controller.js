const mongoose = require('mongoose');
const User = mongoose.model('users');
const News = mongoose.model('news');
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('abf08a911e534e629682c3098dc1b9ca');
var session = require('express-session');
var identityKey = 'skey';
const assert = require('assert');



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
            "preference": req.body.preference,
            "likedNews": req.body.likedNews
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
// let createNews = function(req, res) {

//     let news = new News(
//         {
//             "id": req.body.id,
//             "description": req.body.description,
//             "url": req.body.url,
//             "category": req.body.category,
//             "dates": req.body.dates,
//             "imageurl": req.body.imageurl
//         }
//     );

//     news.save(function(err, newNews) {
//         if (!err) {
//             res.json(newNews);
//         } else {
//             res.sendStatus(400);
//         }
//     });

// };

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


var likedNews = function(req, res){

    var loginUser = session.loginUser;
    var isLogined = !!loginUser;


    if(isLogined){
       

        User.findOne({username: loginUser}, function(err, user){
            if (err) throw err;
            News.findOne({_id: req.params.objectid}, function(err, news_item){
                if (err) throw err;

                news_item.save(function(err){
                    if (err) throw err;
                    user.likedNews.push(news_item);
    
                    user.save(function(err){
                        if (err) throw err;
    
                        res.redirect(`/newsdetail/${req.params.category}/${req.params.objectid}`);
                    });
    
                });
            });

            
    
        });
    }
    else{
        // res.render('login',{
        //     title: "login"
        // });
        res.redirect('/login');
    }
};




module.exports.mainPage = mainPage;

//user
module.exports.createAdmin = createAdmin;
module.exports.allUsers = allUsers;
module.exports.getinfoByUsername = getinfoByUsername;

//News
module.exports.allNews = allNews;

//interaction
module.exports.likedNews = likedNews;
