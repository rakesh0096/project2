const bcrypt = require('bcryptjs');
var db = require('../models/user');
var jwt = require('jsonwebtoken');
var config = require('../bin/config.json');
const { check, validationResult } = require('express-validator');


// create new user 

exports.register = (req,res)=>{
    var content = req.body
    db.findOne({email: content.email}, function (err, docs) {
      if(docs){
        if(docs.email == content.email)
        {
          res.send({"success":false,"status":400,"message":'user already exist',"data":{}})
        }
      }
      else
      {
        var obj = new db({
          firstName: content.firstName,
          lastName: content.lastName,
          email: content.email,
          password: bcrypt.hashSync(content.password, 10)
        })
        obj.save((err,data)=>{
          if(!err)
          {
            res.json(
              {
                "success":true,
                "status":200,
                "message":'user registered',
                "data":obj
              })}
          else
          {
            res.json({
              "success":false,
              "status":400,
              "message":err,"data":obj
            })}
        })
      }
    })
}

//user login and token generation

exports.login = (req,res)=>{
  var content = req.body
  db.find({email: content.email}, function (err, docs) {
    if(docs.length == 0){
      res.send({"success":false,"status":400,"message":'invalid credentials',"data":content})
    }
    else{
      if(!bcrypt.compareSync(content.password, docs[0].password)){
        res.send({"success":false,"status":400,"message":'invalid credentials',"data":content})  
      }

      else{
        // var token = jwt.sign({
        //   id:docs[0]._id,
        //   email:docs[0].email,
        //   firstName:docs[0].firstName,
        //   lastName:docs[0].lastName
        // },config[1].s_key,{expiresIn: 12000});
        res.send({"success":true,"status":200,"message":"Successfully login","token":docs})
      }
    }
  })
}