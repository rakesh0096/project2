const db  = require('./db'); 
var userSchema = db.Schema({
  firstName :{type:String,required:true,trim:true},
  lastName : {type:String,required:true,trim:true},
  email :    {type:String,required:true,trim:true},
  password : {type:String,required:true,trim:true}
});


userSchema.set('toJSON', {
  transform: function(doc, ret, opt) {
      delete ret['password']
      return ret
  }
})


// compile schema to model
module.exports = db.model('User', userSchema);