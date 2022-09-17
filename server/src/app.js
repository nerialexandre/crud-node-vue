const express = require('express')
const routes = require('./routes')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(routes)

app.listen(5000, () => {
  console.log('🚀️ Backend started! - 5000')
})

module.exports = app