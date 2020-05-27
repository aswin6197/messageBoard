var express = require('express');
var router = express.Router();
var { messages } = require("../models");

exports.home = function(req, res, next) {

    messages.findAll({
        attributes : ['name','message'],
        order : [
            ['createdAt','ASC']
        ]
    }).then(msgs =>{
        res.render('index',{messages : msgs})
    })
    // res.render('index', { title: "temp" });
  };

exports.msg = function(req, res, next) {
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