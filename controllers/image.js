var express = require('express')
// var multer = require("multer");
// var storage = require("../config/multer")

   
// var upload = multer({ storage: storage }).single('avatar')

//form for adding images
exports.form = function(req ,res ,next){
    res.render("image.pug");
}

//add new image
exports.addImage = function(req ,res, next){
    // upload(req, res, function (err) {
    //     if (err instanceof multer.MulterError) {
    //       // A Multer error occurred when uploading.
    //     } else if (err) {
    //       // An unknown error occurred when uploading.
    //     }
    
    //     // Everything went fine.
    //   })
    res.send("worked")
}