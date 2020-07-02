var express = require("express");
var router = express.Router();

var { User} = require("../models");

exports.home = function(req, res, next){
    req.user.getMessages().then(msgs => {
        // for(data of msgs)
        //     console.log(data.message);
        res.render("profile",{data : "aswin",user : req.user,messages : msgs})
    })
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