const express = require('express')
const apiRoutes = require('./api')
const router = express.Router()

const api = process.env.BASE_URL

router.use(api, apiRoutes)

router.use(api, (req, res) => {
    res.send("No api routes found")
})


module.exports = router