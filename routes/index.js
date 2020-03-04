var express = require('express');
var authController = require('../controllers/auth.controllers')
var router = express.Router();
const jwt = require('jsonwebtoken')

var config = require('../bin/config.json');
var key = config[1].s_key;

router
    .route('/auth/register')
    .post(authController.register);



router
    .route('/auth/login')
    .post(authController.login);

require('./users')(router)


const checkAuth = (req,res,next)=>{
    if(!req.headers.token){
        res.send('unauthorized user')
    }
    else{
        jwt.verify(req.headers.token, key, function(err, decoded){
        if(!err){
            next();
        } 
        else {
            res.send('unauthorized access');
        }
          })
        }
    }   

router.use(checkAuth)



require('./products')(router)

router.all('*', function(req, res) {
    res.send("invalid url " + String(req.url));
  })


module.exports = router;