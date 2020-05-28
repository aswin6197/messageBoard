var express = require('express');
var router = express.Router();
var { messages } = require("../models");

exports.home = function(req, res, next) {

    console.log(req.query);

    messages.count().then(count =>{
        messages.findAll({
            attributes : ['name','message'],
            order : [['createdAt','ASC']],
            offset : count-3,
            limit : 3
        }).then(msgs =>{
            res.render('index',{messages : msgs});
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
    console.log(req.body);
    messages.create({
        name : req.body.username,
        message : req.body.message
    }).then(msg => {

        // console.log("added"+msg);
        res.send({msg:"success"});
    })
    // console.log("message is "+req.body.input);
    // res.redirect("/done");
}