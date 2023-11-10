require('dotenv').config()

const express = require('express')
const app = express()
const router = require('./routes')
const dbConnection = require('./config/dbConfig')
const cors = require('cors')


// connection to dataBase
dbConnection()

// middleware
app.use(cors())
app.use(express.json())

// routes
app.use(router)




const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})