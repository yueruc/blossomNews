var express = require('express');
var router = express.Router();

var controller = require('../controller/controller.js');

router.get('/', controller.mainPage);

// Display a random generated user.
router.get('/users/all', controller.allUsers);
router.post('/users', controller.createAdmin);
router.get('/login', controller.login);
router.post('/login', controller.checkUser);
router.get('/logout', controller.logout);
router.get('/users/:username', controller.getinfoByUsername);

//Display news
router.post('/news', controller.createNews);
router.get('/news/all', controller.allNews);
router.get('/addnews', controller.addNews);
router.get('/:category', controller.findOneCategoryNews);
//router.post('/:category', controller.findOneCategoryNews);
router.get('/:category/:description', controller.findUrl);
//router.get('/newest/:dates', controller.getNewestNews);

//interacting with news
//router.put()




module.exports = router;
