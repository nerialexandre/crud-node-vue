const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const expressLogger = require('./config/winston/expressWinston')()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// logs
app.use(expressLogger)

app.use(cors())
app.use(routes)

app.listen(3000, () => {
  console.log('🚀️ Backend started! - 5000')
})

module.exports = app