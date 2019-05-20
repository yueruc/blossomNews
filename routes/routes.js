var express = require('express');
var router = express.Router();

var controller = require('../controller/controller.js');

router.get('/', controller.mainPage);

// Display a random generated user.
router.get('/users/all', controller.allUsers);
router.post('/users', controller.createAdmin);
router.get('/login', controller.login);
router.get('/signUp', controller.signUp);
router.post('/login', controller.checkUser);
router.get('/logout', controller.logout);
router.get('/users/:username', controller.getinfoByUsername);

//Display news
router.post('/news', controller.createNews);
router.get('/news/all', controller.allNews);
router.get('/addnews', controller.addNews);
router.get('/:category', controller.findOneCategoryNews);
router.get('/:category/:description', controller.findUrl);

//interaction
router.get('/:newsid/:category/:description', controller.likedNews);





module.exports = router;
