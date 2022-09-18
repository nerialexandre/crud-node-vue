const { Router } = require('express')
const { param, body } = require('express-validator')
const initController = require('./app/controllers/initController')

const routes = new Router()

routes.route('/books')
  .get(initController.getAll)
  .post(
    [
      body('title')
        .exists({ checkFalsy: true })
        .withMessage('O titulo é obrigatorio')
        .isString()
        .withMessage('titulo deve ser string'),
      body('author')
        .exists({ checkFalsy: true })
        .withMessage('O autor é obrigatorio')
        .isString()
        .withMessage('Nome do autor deve ser string'),
      body('releaseDate')
        .optional(),
      body('pages')
        .optional({ checkFalsy: true })
        .isInt({ min: 1 })
        .withMessage(
          'O número da página deve ser um inteiro maior ou igual a 1'
        ),
      body('publishingCompany')
        .optional()
        .isString()
        .withMessage('Nome da editora deve ser string'),

    ],
    initController.create
  )

routes.route('/books/:id')
  .get(
    [
      param('id')
        .exists()
    ],
    initController.getOne
  )
  .put(
    [
      param('id')
        .exists(),
      body('title')
        .exists({ checkFalsy: true })
        .withMessage('O titulo é obrigatorio')
        .isString()
        .withMessage('titulo deve ser string'),
      body('author')
        .exists({ checkFalsy: true })
        .withMessage('O autor é obrigatorio')
        .isString()
        .withMessage('Nome do autor deve ser string'),
      body('releaseDate')
        .optional(),
      body('pages')
        .optional({ checkFalsy: true })
        .isInt({ min: 1 })
        .withMessage(
          'O número da página deve ser um inteiro maior ou igual a 1'
        ),
      body('publishingCompany')
        .optional()
        .isString()
        .withMessage('Nome da editora deve ser string'),

    ],
    initController.update
  )
  .delete(
    [
      param('id')
        .exists()
    ],
    initController.delete
  )

module.exports = routes