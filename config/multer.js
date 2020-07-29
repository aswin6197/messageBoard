var multer = require("multer");
var {Message } = require("../models")
var path = require("path");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/')
    },


    filename: function (req, file, cb) {
        // console.log(req.user.id.toString()+Date.now())
        Message.count().then(count =>{
            cb(null,count.toString()+path.extname(file.originalname))
        })

        // cb(null, req.user.id.toString()+Date.now() )
    }
  })

module.exports = storage