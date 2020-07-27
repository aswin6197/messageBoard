var express = require('express');
var router = express.Router();
var board = require("../controllers/board")
var auth = require("../controllers/auth");
var profile = require("../controllers/profile");

var passport = require("passport");
require("../passportConfig")(passport);

/* GET home page. */
router.post('/main',board.msg);
router.get('/main', board.home);

// router.get("/login",auth.login);
// router.post("/login",passport.authenticate(
    //     'local',{
        //         successRedirect : "/",
        //         failureRedirect : "/error"
        //     }
        // ));

router.get("/",auth.main)        
router.get("/signup",auth.signup);
router.post("/signup",auth.addUser);

// router.get("/incorrect",auth.incorrect);

router.get("/logout",auth.logout);

router.get('/profile/:id',profile.home)

router.get("/profile",profile.home);
router.post("/editData",profile.editData);
router.post("/editPasswd",profile.editPasswd);

router.post("/passwd",profile.passwd);
router.get('/login', auth.login);
router.post("/login",auth.checkLogin);  

router.post("/checkPasswd",profile.checkPasswd);

router.get("/topics",board.topicList)

router.get("/topic/:topic",board.msgList);
router.post("/topic/:topic",board.addMessage);
router.post("/topics",board.addTopics);
module.exports = router;
        