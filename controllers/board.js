var express = require('express');
var router = express.Router();
var { Topic,Message,User, sequelize } = require("../models");
var path = require('path')

// not needed
// exports.home = function(req, res, next) {

//     if(!req.isAuthenticated())
//         res.redirect("/login");

//     let page = req.query.page || 1;
//     console.log(req.path)
    

//     if(page == undefined)
//         page = 1;
//     Message.count().then(count =>{
//         let msgCount = 7;
//         let lastPage = Math.ceil(count / msgCount)
//         let limit =  msgCount;
//         let offset = (page - 1)* msgCount;

//         // let ofset = (count > msgCount)? count - msgCount : 0
//         Message.findAll({
//             attributes : ['author','message','createdAt'],
//             // offset : ofset,
//             limit : limit,
//             offset : offset,
//             order : [['createdAt','DESC']]
//         }).then(msgs =>{
//             // console.log(msgs[0].Users)
//             console.log(page,lastPage);
//             res.render('index',{
//                 messages : msgs,
//                 username :req.user.name,
//                 page : page,
//                 max : lastPage,
//                 limit : msgCount,
//                 url : req.path
//             });
//         })
//     });
//    };

// exports.msg = function(req, res, next) {
//     // console.log(req.user.name);
//     req.user.createMessage({
//         author : req.user.name,
//         message : req.body.message
//     })
    
//     .then(msg => {
//     res.send({msg:"success"});
//     })
// }

//list all topics
exports.topicList = function(req, res, next){
    let page = req.query.page || 1;
    if(page == undefined)
        page = 1;

    // Topic.count().then(count =>{
    //     let msgCount = 7;
    //     let lastPage = Math.ceil(count / msgCount);
    //     let limit = msgCount;
    //     let offset = (page - 1)* msgCount;

    //     Topic.findAll({
    //         attributes : ['TopicName'],
    //         limit : limit,
    //         offset : offset,
    //         order : [['createdAt','DESC']],
    //     }).then(topics =>{
    //         res.render('index',{
    //             topics : topics,
    //             username :req.user.name,
    //             page : page,
    //             max : lastPage,
    //             limit : msgCount,
    //             url : req.path,
    //         });  
    //     })
    // })
    Topic.findAll({
        // attributes : ['topic'],
        attributes : ['TopicName','id'],
        order : [['createdAt','DESC']]
    }).then(messages =>{
        console.log(messages);
        res.render('topicList',{topics : messages})
    })
}

//list messages
exports.msgList = function(req, res, next){

    if(!req.isAuthenticated())
        res.redirect("/login");

    let page = req.query.page || 1;
    
    // let topic = req.param("topic");
    let topic = req.params.topic
    console.log(topic)
    let topicName;
    Topic.findOne({
        attributes : ['TopicName'],
        where : {
            id : topic
        }
    }).then(TopicName => {
        topicName = TopicName.TopicName
    })

    if(page == undefined)
        page = 1;
    Message.count({
        where : {
            TopicId : topic
        }
    }).then(count =>{
        let msgCount = 7;
        let lastPage = Math.ceil(count / msgCount)
        let limit =  msgCount;
        let offset = (page - 1)* msgCount;

        // let ofset = (count > msgCount)? count - msgCount : 0
        Message.findAll({
            attributes : ['author','message','createdAt','image'],
            // offset : ofset,
            limit : limit,
            offset : offset,
            order : [['createdAt','DESC']],
            include : [{
                model : Topic,
                where : {
                    id : topic
                }
            }]
        }).then(msgs =>{
            // console.log(msgs[0].Users)
            console.log(page,lastPage);
            res.render('index',{
                messages : msgs,
                username :req.user.name,
                page : page,
                max : lastPage,
                limit : msgCount,
                url : req.path,
                topic : topicName
            });
        })
    });
};

//add new message
exports.addMessage = function(req, res, next){
    let topic = req.param("topic");
    let image = null;
    Message.count().then(count =>{
        if(req.file){
            // console.log("file extension is "+path.extname(req.file.originalname))
            image = count.toString()+path.extname(req.file.originalname)
        }
        req.user.createMessage({
            author : req.user.name,
            message : req.body.message,
            TopicId : topic,
            id : count+1,
            image : image
        })
        // console.log("next sending works")
        .then(msg => {
            // console.log("new one works")
            res.redirect(req.url)
            // res.send({msg:"success"});
        })
    })
}

//add new topic
exports.addTopics = function(req, res, next){
    Topic.count().then(count =>{
        
        Topic.create({
            TopicName : req.body.topic,
            id : count+1
        }).then(topic =>{
            res.redirect("/topics")
        })
    })
}


