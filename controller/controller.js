const mongoose = require('mongoose');
const User = mongoose.model('users');
const News = mongoose.model('news');
const Comment = mongoose.model('comments');
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('abf08a911e534e629682c3098dc1b9ca');
var session = require('express-session');
const assert = require('assert');



//the main Page
let mainPage = function(req, res) {

    var loginUser = session.loginUser;
    var isLogined = !!loginUser;

    if(isLogined){
        res.redirect('/index');
    }
    else{
        res.render('main',{
            title: "BlossomNews"
        });
    }
};

// Push 4 users and save to database.
let createAdmin = function(req, res) {
    let user = new User(
        {
            "username": req.body.username,
            "password": req.body.password,
            "preference": req.body.preference,
            "likedNews": req.body.likedNews
        });

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

//likedNews Function
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
                        res.redirect(`/newsdetail/${req.params.objectid}`);
                    });
    
                });
            });
        });
    }
    else{
        res.redirect('/login');
    }
};

//Comment function
var addcomments = function(req, res){
    var object_id = req.params.news_ojbectid;
    News.findById(object_id, function(err, the_news){
        if (err) throw err;

        let comment_item = new Comment({
            "content": req.body.comment
        });
        comment_item.save(function(err){
                
            if (err) throw err;
            the_news.comment.push(comment_item);
            the_news.save(function(err){
                if (err) throw err;
                res.redirect(`/newsdetail/${object_id}`);
            });
        });
    });
};

var recommendnews = function(req, res){
    
    var loginUser = session.loginUser;
    var isLogined = !!loginUser;
    var categories = new Array();


    if(isLogined){
        User.findOne({username: loginUser}, function(err, user){
            if (err) throw err;
            
            for(var i = 0; i < 3; i++){
                categories.push(user.preference[i]);
            }

            News.find({category:categories},function(err, news){
                if (err) throw err;
                res.render('index',{
                    title: "BlossomNews",
                    images: [news[0].imageurl, news[1].imageurl,news[2].imageurl],
                    newsID:  [news[0]._id, news[1]._id, news[2]._id],
                    newstitle:  [news[0].id, news[1].id, news[2].id]
                });
            });  
        });
    }

    else{
        res.redirect('/');
    }

}


module.exports.mainPage = mainPage;

//user
module.exports.createAdmin = createAdmin;
module.exports.allUsers = allUsers;
module.exports.getinfoByUsername = getinfoByUsername;

//News
module.exports.allNews = allNews;

//interaction
module.exports.likedNews = likedNews;
module.exports.addcomments = addcomments;
module.exports.recommendnews = recommendnews;
