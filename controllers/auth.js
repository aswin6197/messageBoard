var express = require("express");
var router = express.Router();

var passport = require("passport");
require("../passportConfig");


var { Users} = require("../models");

exports.login = function(req, res, next){
    if(req.isAuthenticated())
        res.redirect("/");
    res.render('loginSignup',{link : "login"});
}



exports.signup = function(req, res, next){
    res.render('loginSignup',{link : "signup"});
}
exports.checkLogin = function(req, res, next){
    passport.authenticate('local',{
        successRedirect:"/",
        failureRedirect : '/error',
    })(req, res, next);
}

exports.addUser = function(req, res, next){
    console.log(req.body)
    Users.create({
        username : req.body.username,
        password : req.body.password
    }).then(user => {
        // res.redirect("/login");
        req.login(user,function(err){
            if(err)
                return next(err);
            // console.log(req.session);
            res.redirect("/");
        });
        // console.log(req.session);
        // res.redirect("/");
    }).catch(function(err){
        console.log(err);
        res.redirect("/errors");
    })
}

exports.logout = function(req, res, next){
    req.logout();
    res.redirect("/login");
}