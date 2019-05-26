const mongoose = require('mongoose');
const News = mongoose.model('news');
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('abf08a911e534e629682c3098dc1b9ca');


let createNews = function(req, res) {

    let news = new News(
        {
            "id": req.body.id,
            "description": req.body.description,
            "url": req.body.url,
            "category": req.body.category,
            "dates": req.body.dates,
            "imageurl": req.body.imageurl
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
                    "category": newsArray[i].category,
                    "dates": newsArray[i].dates,
                    "imageurl": newsArray[i].imageurl
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
            res.render('news', {
                title: newscategory,
                news: news
            });
        }
    });
};


var newsdetail = function(req, res) {
    var newscategory = req.params.category;
    News.findOne({_id:req.params.objectid}, function(err, news) {
        if (err) {
            res.send("No matching Found!");
        }else{
            res.render('newsdetail', {
                title: newscategory,
                eachnews: news
            });
        }
    });
};

//check news by url
var findUrl = function(req, res) {
    News.find({_id: req.params.objectid}, function(err, thenews) {
        if (err) {
            res.send("No matching Found!");
        }else{
            res.redirect(thenews[0].url);
        }
    });
};


module.exports.createNews = createNews;
module.exports.addNews = addNews;
module.exports.findOneCategoryNews = findOneCategoryNews;
module.exports.newsdetail = newsdetail;
module.exports.findUrl = findUrl;