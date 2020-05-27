var express = require('express');
var router = express.Router();
var board = require("../controllers/board")

/* GET home page. */
router.get('/', board.home);
router.post('/',board.msg);
module.exports = router;
