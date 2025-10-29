const mongoose = require('mongoose');
const bcrypt =require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,   
  },
  otp:{
    type: String,   
  },
  verified:{
    type: Boolean,
    default:false
  }
});

userSchema.methods.validatepassword = async function(userpassword) {
return await bcrypt.compare(userpassword,this.password)
};

//jwt token
userSchema.methods.getjwt=function(){
  let token=jwt.sign({
    id:this._id,
    name:this.name,
    email:this.email
  }, process.env.JWT_SECRET); 
  //},'jwtsecret',{expiresIn:'ih'});
  return token;
}


userSchema.pre('save', async function(next) {
    if(!this.isModified('password')){
        return next();
    }
        this.password = await bcrypt.hash(this.password, 5);
    return next();
});

module.exports = mongoose.model('User', userSchema);



