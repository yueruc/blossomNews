var express = require('express');
var router = express.Router();

var controller = require('../controller/controller.js');
var user = require('../controller/user.js');
var news = require('../controller/news.js');

router.get('/', controller.mainPage);
router.get('/index', controller.recommendnews);

// Display a random generated user.
router.get('/users/all', controller.allUsers);
router.post('/users', controller.createAdmin);
router.get('/users/:username', controller.getinfoByUsername);

router.get('/login', user.login);
router.get('/signUp', user.signUp);
router.post('/signUp', user.register);
router.post('/login', user.checkUser);
router.get('/logout', user.logout);

//Display news
router.get('/news/all', controller.allNews);


router.post('/news', news.createNews);
router.get('/addnews', news.addNews);
router.get('/:category', news.findOneCategoryNews);
router.get('/newsdetail/:objectid', news.newsdetail);
router.get('/findnews/:objectid', news.findUrl);

//interaction
router.get('/likednews/:category/:objectid', controller.likedNews);
router.post('/addcomment/:category/:news_ojbectid', controller.addcomments);

//search
router.post('/search', controller.search);







module.exports = router;
