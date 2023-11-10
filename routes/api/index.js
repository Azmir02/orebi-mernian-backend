const express = require('express')
const router = express.Router()

const abc = require('./auth.js')

router.use('/auth', abc)

http: module.exports = router