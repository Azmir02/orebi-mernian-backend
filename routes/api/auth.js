const express = require('express');
const registrationController = require('../../controller/registrationController');
const matchOTP = require('../../controller/matchOtpController');
const loginController = require('../../controller/loginController');
const router = express.Router();

router.post('/registration', registrationController)
router.post('/matchOTP', matchOTP)
router.post('/login', loginController)

module.exports = router;    