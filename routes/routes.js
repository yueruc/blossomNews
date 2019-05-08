var express = require('express');
var router = express.Router();

var controller = require('../controller/controller.js');

// Display a random generated user.
router.get('/users/all', controller.allUsers);
router.post('/users', controller.createAdmin);
router.post('/users/login', controller.checkUser);
router.get('/users/:username', controller.getinfoByUsername);

//Display news
router.post('/news', controller.createNews);
router.get('/news/all', controller.allNews);
router.get('/:category', controller.findOneNews);
router.get('/newest/:dates', controller.getNewestNews);



module.exports = router;
