var express = require("express");
var router = express.Router();

var passport = require("passport");
require("../passportConfig");


var { Users} = require("../models");

exports.login = function(req, res, next){
    res.render('login',{link : "login"});
}



exports.signup = function(req, res, next){
    res.render('login',{link : "signup"});
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
        res.redirect("/login");
    }).catch(function(err){
        console.log(err);
        res.redirect("/error");
    })
}