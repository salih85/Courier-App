const Admin=require('../../models/admin')

exports.AdminsignupPage =(req,res)=>{
    try{
       return res.render('admin/signup',{admin:req.admin})
    }catch(e){
        console.log(e)
        res.redirect('/')
    }
}

exports.Adminsignup =async(req,res)=>{
    try{
        const {username,password} =req.body
         await Admin.create({
         id: `${Date.now()}`,
         username,password
  });
  return res.redirect('/admin/login');
    }catch(e){
        console.log(e)
        res.redirect('/')
    }
}

exports.AdminloginPage = (req, res) => {
    try {
        if(req.admin){
            return res.redirect('/admin')
        }
        return res.render('admin/login', { msg: "",admin:false }); 
    } catch (e) {
        console.log(e);
        res.redirect('/');
    }
};

exports.Adminlogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        const foundUser = await Admin.findOne({ username: username });
        if (!foundUser) {
            return res.render('admin/login', { msg: 'Invalid username or password' });
        }

        const verified = await foundUser.validatepassword(password);
        if (!verified) {
            return res.render('admin/login', { msg: 'Invalid username or password' });
        }

        const token = await foundUser.getjwt();
        return res.cookie('admin', token).redirect('/admin');
    } catch (e) {
        console.log(e);
        res.redirect('/');
    }
};

   exports.Adminlogout =(req,res)=>{
      return res.clearCookie('admin').redirect('/admin/login');
   }
