const { Router } = require('express')
const initController = require('./app/controllers/initController')

const routes = new Router()

// routes initController
routes.route('/index').get(initController.index)

module.exports = routes