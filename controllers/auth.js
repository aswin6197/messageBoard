var express = require("express");
var router = express.Router();

var passport = require("passport");
require("../passportConfig");


var { User} = require("../models");

//get req for login
exports.login = function(req, res, next){
    if(req.isAuthenticated())
        res.redirect("/");
    res.render('loginSignup',{link : "login"});
}


//get req for signup
exports.signup = function(req, res, next){
    res.render('loginSignup',{link : "signup"});
}
//post req for login
exports.checkLogin = function(req, res, next){
    console.log(req.body)
    passport.authenticate('local',{
        successRedirect:"/",
        failureRedirect : '/error',
    })(req, res, next);
}

//post req of signup
exports.addUser = function(req, res, next){
    console.log(req.body)
    User.create({
        name : req.body.username,
        password : req.body.password,
        email : req.body.email
    }).then(user => {
        // res.redirect("/login");
        req.login(user,function(err){
            if(err)
                return next(err);
            res.redirect("/");
        });
    }).catch(function(err){
        console.log(err);
        res.redirect("/errors");
    })
}

//get req for logout
exports.logout = function(req, res, next){
    req.logout();
    res.redirect("/login");
}