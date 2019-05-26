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
    res.render('signUp',{
        title: "signUp"
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
module.exports.login = login;
module.exports.logout = logout;
module.exports.checkUser = checkUser;