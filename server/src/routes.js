const { Router } = require('express')
const initController = require('./app/controllers/initController')

const routes = new Router()

routes.route('/books')
  .get(initController.getAll)
  .post(initController.create)

routes.route('/books/:id')
  .get(initController.getOne)
  .put(initController.update)
  .delete(initController.delete)

module.exports = routes