 const express = require('express');
const { loginPage,login, signupPage, signup, logout } = require('../controllers/auth/user');
const { AdminloginPage, Adminlogin, AdminsignupPage, Adminsignup, Adminlogout } = require('../controllers/auth/admin');

 const router = express.Router();
//USER
     router
       .route('/login')
       .get(loginPage)
        .post(login)

router
    .route('/signup')
    .get(signupPage)
    .post(signup);

router
    .route('/logout')
    .get(logout)




    //ADMIN

router
       .route('/admin/login')
       .get(AdminloginPage)
        .post(Adminlogin)

router
    .route('/admin/signup')
    .get(AdminsignupPage)
    .post(Adminsignup);

router
    .route('/admin/logout')
    .get(Adminlogout)


 module.exports = router;