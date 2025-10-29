const express = require('express');
const { trackParcel,home } = require('../controllers/user/common');

 const router = express.Router();

     router
       .route('/')
       .get(home)

       router
       .route('/track')
       .get(trackParcel)
 


 module.exports = router;