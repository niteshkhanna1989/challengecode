var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
router.use(bodyParser.urlencoded({ extended: true }));
var User=require('./User');




// route to authenticate a user (POST http://localhost:3000/authenticate)
router.post('/', function(req, res) {
    
      // find the user
      User.findOne({
        UserName: req.body.username,
       
      }, function(err, user) {
    
        if (err) throw err;
    
        if (!user) {
          res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user)
         {
    
          // check if password matches
          if (user.Password != req.body.password) {
            res.json({ success: false, message: 'Authentication failed. Wrong password.' });
          } else {
    
            // if user is found and password is right
            // create a token
            var token = jwt.sign({data:user}, req.app.get('superSecret'), {
                expiresIn: 60*60*24 // expires in 24 hours
            });
    
            // return the information including token as JSON
            res.json({
              success: true,
              message: 'Enjoy your token!',
              token: token
            });
          }   
    
        }
    
      });
    });




module.exports = router;