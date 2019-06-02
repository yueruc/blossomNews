const mongoose = require('mongoose');
const User = mongoose.model('users');
var session = require('express-session');
var identityKey = 'skey';

let login = function(req,res){
    var loginUser = session.loginUser;
    var isLogined = !!loginUser;

    if(isLogined){
      
        User.findOne({username: loginUser}).
                populate('likedNews').
                exec(function(err, user) {
                res.render('logined',{
                    title: "loginned",
                    name: loginUser || '',
                    likedNews : user.likedNews
                });
        });
      
    }
    else{
        res.render('login',{
            title: "login"
        });
    }
};

let signUp = function(req,res){
    res.render('signup',{
        title: "signUp"
    });
};

let register = function(req,res){
    var preference = new Array();
    if (req.body.Entertainment){
        preference.push("entertainment");
    }
    if (req.body.Science){
        preference.push("science");
    }
    if (req.body.Sport){
        preference.push("sports");
    }
    if (req.body.Technology){
        preference.push("technology");
    }
    if (req.body.Business){
        preference.push("business");
    }
    if (req.body.Health){
        preference.push("health");
    }
    let new_user = new User({
        "username": req.body.username,
        "password": req.body.psw,
        "preference": preference
    });

    new_user.save(function(err, newUser) {
        if (!err) {
            session.loginUser = req.body.username;
            res.redirect('/');
        } else {
           res.redirect('/signup');
        }
    });
    
};

//check logIn system with username & password
let checkUser = function(req, res){
    var userName = req.body.username;
    var passWord = req.body.password;

    User.findOne({username: userName, password: passWord}, function(err, user){
        if(!err){
            if(user){
                session.loginUser = userName;
                res.redirect('/');
                
            }else{
                res.redirect('/login');
            }
        }else{
            res.sendStatus(400);
        }
    });
}

var logout = function(req, res, next){
    session.loginUser = null;
    res.clearCookie(identityKey);
    res.redirect('/');
}


module.exports.signUp = signUp;
module.exports.register = register;
module.exports.login = login;
module.exports.logout = logout;
module.exports.checkUser = checkUser;