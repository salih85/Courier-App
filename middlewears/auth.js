const jwt=require('jsonwebtoken');

exports.checkLogin = (req, res, next) => {
    try{
         const token = req.cookies?.user;
    if (!token) {
      return next()
    }
     let details = jwt.verify(token, process.env.JWT_SECRET);
    //console.log( details);
    if (!details){
        return next()
    }

    req.user = details;
    return next();

    }catch (err) {
    console.log(err.message);
    return res.clearCookie('user').redirect('/login');
  }
}

exports.onlyUsers = (req, res, next) => {
  try {
   
    if (!req.user) {
      return res.redirect('/login');
    }
    return next()

  } catch (err) {
    console.log(err.message);
    return res.clearCookie('user').redirect('/login');
  }
};

exports.onlyAdmin = (req, res, next) => {
    try{
         const token = req.cookies?.admin;
    if (!token) {
      return  res.redirect('/admin/login')
    }
     let details = jwt.verify(token, process.env.JWT_SECRET);
    //console.log( details);
    if (!details){
         return  res.redirect('/admin/login')
    }

    req.user = details;
    return next();

    }catch (err) {
    console.log(err.message);
    return res.clearCookie('admin').redirect('/admin/login');
  }
}

