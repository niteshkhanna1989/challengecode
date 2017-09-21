var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
var User=require('./User');

// route to authenticate a user (POST http://localhost:3000/register)
router.post('/', function(req, resp){
    var newUser = new User({
     UserName:req.body.username,
     Password:req.body.password
    });

    newUser.save(function(err) {
        if (err)
        resp.json({ success: false, message: 'Failed to Add User.' }); 
        else 
        resp.json({ success: true, message: 'User Added Successfully.' }); 
    });
});

module.exports = router;