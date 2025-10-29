const user=require('../../models/user')

exports.signupPage =(req,res)=>{
    try{
       return res.render('users/signup',{user:req.user})
    }catch(e){
        console.log(e)
        res.redirect('/')
    }
}

exports.signup =async(req,res)=>{
    try{
        const {name,email,password} =req.body
         await user.create({
         id: `${Date.now()}`,
         name,email,password
  });
  return res.redirect('/login');
    }catch(e){
        console.log(e)
        res.redirect('/')
    }
}

exports.loginPage = (req, res) => {
    try {
        if(req.user){
            return res.redirect('/dashboard')
        }
        return res.render('users/login', { msg: "",user:false }); 
    } catch (e) {
        console.log(e);
        res.redirect('/');
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const foundUser = await user.findOne({ email:email });
        if (!foundUser) {
            return res.render('user/login', { msg: 'Invalid email or password' });
        }
        const verified = await foundUser.validatepassword(password);
        if (!verified) {
            return res.render('user/login', { msg: 'Invalid email or password' });
        }

        const token= await foundUser.getjwt()
        return res.cookie('user',token).redirect('/dashboard')


    } catch (e) {
        console.log(e);
        res.redirect('/');
    }
};

   exports.logout =(req,res)=>{
      return res.clearCookie('user').redirect('/login');
   }
