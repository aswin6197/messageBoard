var express = require('express');
var router = express.Router();
var board = require("../controllers/board")
var auth = require("../controllers/auth");
var profile = require("../controllers/profile");

var passport = require("passport");
require("../passportConfig")(passport);

/* GET home page. */
router.get('/', board.home);
router.post('/',board.msg);

router.get("/login",auth.login);
// router.post("/login",passport.authenticate(
//     'local',{
//         successRedirect : "/",
//         failureRedirect : "/error"
//     }
// ));
router.post("/login",auth.checkLogin);  
router.get("/signup",auth.signup);
router.post("/signup",auth.addUser);

router.get("/logout",auth.logout);

router.get("/profile",profile.home);
router.post("/editData",profile.editData);
router.post("/editPasswd",profile.editPasswd);

router.post("/passwd",profile.passwd);
module.exports = router;
