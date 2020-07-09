var express = require("express");
var router = express.Router();

var { User,Message} = require("../models");

exports.home = function(req, res, next){
    let user = req.user;
    let page = req.query.page || 1;

    if(page == undefined)
        page = 1;
    // user.getMessages().then(msgs =>{
    //     let count = msgs.length;
    //     let msgCount = 7;
    //     let lastPage = Math.ceil(count/msgCount);
    //     let limit = msgCount;
    //     let offset = (page -1)*msgCount

    //     user.getMessages()({
    //         attributes : ['message','createdAt'],
    //         limit : limit,
    //         offset : offset,
    //         order : [['createdAt','DESC']]
    //     }).then(msgs =>{
    //         res.render('profile2',{
    //             messages : msgs,
    //             user : user,
    //             page : page,
    //             max : lastPage,
    //             url : req.path
    //         })
    //     })
    // })

    Message.count({
        include : [{
            model : User,
            where : {
                id : user.id
            }
        }]
    }).then(count =>{
        let msgCount = 7;
        let lastPage = Math.ceil(count/msgCount);
        let limit = msgCount;
        let offset = (page -1)*msgCount

        Message.findAll({
            attributes : ['author','message','createdAt'],
            limit : limit,
            offset : offset,
            order : [['createdAt','DESC']],
            include : [{
                model : User,
                where : {
                    id : user.id
                }
            }]
        }).then(msgs =>{
            res.render('profile',{
                messages : msgs,
                user : user,
                page : page,
                max : lastPage,
                url : req.path
            })
        })
    })

    // req.user.getMessages().then(msgs => {
    //     console.log(req.params.id)
    //     // for(data of msgs)
    //     //     console.log(data.message);
    //     // console.log();
    //     res.render("profile2",{data : "aswin",user : req.user,messages : msgs})
    // })
    // res.render("profile",{user : req.user})
}
//change personal data
exports.editData = function(req, res, next){
    //password is correct
    let user = req.user;
    if(user.validatePassword(req.body.password)){
        user.name = req.body.username;
        user.email = req.body.email;
        user.age = req.body.age;
        user.save();
        res.redirect("/profile");
    }
    else{
        res.redirect("/error")
    }

}

//change password
exports.editPasswd = function(req ,res ,next){
    let user = req.user;
    if(user.validatePassword(req.body.current)){
        if(req.body.new == req.body.newConfirm){
            user.password = req.body.new;
            res.redirect("/profile")
            user.save();
        }
        else{
            res.redirect("/error")
        }
    }
}


exports.passwd = function(req ,res ,next){
    console.log("something work"+ req.body.id)
    let user = User.findOne({
        where : {
            id : 1
        }
    })
    if(1){
        res.send("true");
    }
    else {
        res.end("false")
    }
    res.end("false")
}