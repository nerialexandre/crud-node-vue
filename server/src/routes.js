const { Router } = require('express')
const { param, body } = require('express-validator')
const booksController = require('./app/controllers/booksController')
const customValidators = require('./app/lib/customValidator')

const routes = new Router()

routes.route('/books')
  .get(booksController.getAll)
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
        .optional({ checkFalsy: true })
        .custom(value => {
          return customValidators.isDateOnly(value)
        })
        .withMessage(
          'O formato da data é invalido'
        ),
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
    booksController.create
  )

routes.route('/books/:id')
  .get(
    [
      param('id')
        .exists()
    ],
    booksController.getOne
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
    booksController.update
  )
  .delete(
    [
      param('id')
        .exists()
    ],
    booksController.delete
  )

module.exports = routes