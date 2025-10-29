const mongoose = require('mongoose');
const bcrypt =require('bcryptjs');
const jwt = require('jsonwebtoken');

const adminSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  username: {
    type: String,
  },
  password: {
    type: String,   
  },
});

adminSchema.methods.validatepassword = async function(userpassword) {
return await bcrypt.compare(userpassword,this.password)
};

//jwt token
adminSchema.methods.getjwt=function(){
  let token=jwt.sign({
    id:this._id,
    username:this.username,
    isAdmin:true
  }, process.env.JWT_SECRET); 
  //},'jwtsecret',{expiresIn:'ih'});
  return token;
}

adminSchema.pre('save', async function(next) {
    if(!this.isModified('password')){
        return next();
    }
        this.password = await bcrypt.hash(this.password, 5);
    return next();
});

module.exports = mongoose.model('Admin', adminSchema);



