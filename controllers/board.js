var express = require('express');
var router = express.Router();
var { Message,User } = require("../models");

exports.home = function(req, res, next) {

    if(!req.isAuthenticated())
        res.redirect("/login");

    let page = req.query.page || 1;
    console.log(req.path)
    

    if(page == undefined)
        page = 1;
    Message.count().then(count =>{
        let msgCount = 7;
        let lastPage = Math.ceil(count / msgCount)
        let limit =  msgCount;
        let offset = (page - 1)* msgCount;

        // let ofset = (count > msgCount)? count - msgCount : 0
        Message.findAll({
            attributes : ['author','message'],
            // offset : ofset,
            limit : limit,
            offset : offset,
            order : [['createdAt','DESC']]
        }).then(msgs =>{
            // console.log(msgs[0].Users)
            console.log(page,lastPage);
            res.render('index2',{
                messages : msgs,
                username :req.user.name,
                page : page,
                max : lastPage,
                limit : msgCount,
                url : req.path
            });
        })
    });
   };

exports.msg = function(req, res, next) {
    // console.log(req.user.name);
    req.user.createMessage({
        author : req.user.name,
        message : req.body.message
    })
    
    .then(msg => {
    res.send({msg:"success"});
    })
}