var express = require('express');
var router = express.Router();
var { Message,User } = require("../models");

exports.home = function(req, res, next) {

    // console.log(req.user);
    // console.log("here" + req.user.msg)
    if(!req.isAuthenticated())
        res.redirect("/login");

    Message.count().then(count =>{
        let msgCount = 10;
        let ofset = (count > msgCount)? count - msgCount : 0
        Message.findAll({
            attributes : ['author','message'],
            offset : ofset,
            limit : msgCount,
            order : [['createdAt','ASC']]
        }).then(msgs =>{
            // console.log(msgs[0].Users)
            res.render('index',{messages : msgs,username :req.user.name});
        })
    });
    // messages.findAll({
    //     attributes : ['name','message'],
    //     order : [
    //         ['createdAt','ASC']
    //     ]
    // }).then(msgs =>{
    //     res.render('index',{messages : msgs,test:"tst"})
    // })
    // res.render('index', { title: "temp" });
  };

exports.msg = function(req, res, next) {
    console.log(req.user.name);
    req.user.createMessage({
        author : req.user.name,
        message : req.body.message
    })
    // messages.create({
    //     author : req.body.username,
    //     message : req.body.message
    // })
    .then(msg => {

        // console.log("added"+msg);
        res.send({msg:"success"});
    })
    // console.log("message is "+req.body.input);
    // res.redirect("/done");
}