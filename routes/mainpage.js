var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(req.user);
    console.log("admin", req.user["admin"]);
    if(req.user["admin"]==true){
        res.render('adminmain', { title: 'WhiteBoard' });
    }
    else{
        res.render('usermain', { title: 'WhiteBoard' });
    }
});

module.exports = router;
