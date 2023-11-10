const express = require('express');
const register = require('../../controllers/registrationcontroller.js');
const router = express.Router();

router.get('/user', register)

module.exports = router;

