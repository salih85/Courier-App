const express = require('express');
const { adminDashboard, updateStatus } = require('../controllers/admin/actions'); 

const router = express.Router();

router.route('/').get(adminDashboard);

router.route('/update-parcel').post(updateStatus); 

module.exports = router;
