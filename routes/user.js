const express = require('express');
const { sendParcelPage, sendParcel,dashboardPage } = require('../controllers/user/parcel');

const router = express.Router();

router
   .route('/send-parcel')
   .get(sendParcelPage)
   .post(sendParcel);

router.get('/dashboard', dashboardPage);

module.exports = router;
