var express = require("express");
var router = express.Router();

var passport = require("passport");
require("../passportConfig");


var { User} = require("../models");
const { msg } = require("./board");

//get req for login
exports.login = function(req, res, next){

    if(req.isAuthenticated())
        res.redirect("/topics");
    let incorrect = req.query.fail;
    console.log(incorrect)
    res.render('loginSignup',{link : "login",failed : incorrect});
}

exports.main = function(req, res, next){
    if(req.isAuthenticated())
        res.redirect("/topics");
    res.redirect("/login")
}

//get req for signup
exports.signup = function(req, res, next){
    let invalid = req.query.invalid

    res.render('loginSignup',{link : "signup",invalid : invalid});
}
//post req for login
exports.checkLogin = function(req, res, next){
    console.log(req.body)
    passport.authenticate('local',{
        successRedirect:"/topics",
        failureRedirect : '/login?fail=true',
    })(req, res, next);
}



//post req of signup
exports.addUser = function(req, res, next){
    // console.log(req.body)
    User.count().then(count =>{

        User.create({
            name : req.body.username,
            password : req.body.password,
            email : req.body.email,
            age : req.body.age,
            id : count+1
        }).then(user => {
            // res.redirect("/login");
            req.login(user,function(err){
            if(err)
            return next(err);
            res.redirect("/");
        });
    }).catch(function(err){
        console.log(err);
        res.redirect("/signup?invalid=true");
    })
    })
}

//get req for logout
exports.logout = function(req, res, next){
    req.logout();
    res.redirect("/");
}



