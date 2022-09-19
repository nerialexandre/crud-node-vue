const graphDBConnect = require('../../config/database')
const formatLib = require('../lib/formatResponse')
const checkBook = require('../lib/checkBook')
const { validationResult } = require('express-validator')
const uuid = require('uuid');

module.exports = {

  async getAll (req, res)
  {
    const { page = 1, limit = 100 } = req.query
    const query = `MATCH (n:Books) RETURN n SKIP ${limit * (page - 1)} LIMIT ${limit}`
    const resultObj = await graphDBConnect.executeCypherQuery(query)
    const result = formatLib.formatBookResponse(resultObj)

    const totalBooks = await graphDBConnect.executeCypherQuery(`MATCH (n:Books) RETURN COUNT(n)`)
    const countTotalBooks = totalBooks.records[0]._fields[0]

    res.send({
      pagesTotal: Math.ceil(countTotalBooks / limit),
      message: 'All Books',
      result
    })
  },

  async getOne (req, res)
  {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params
    const query = 'MATCH (n:Books {id: $id}) RETURN n LIMIT 1'
    const params = { id }
    const resultObj = await graphDBConnect.executeCypherQuery(query, params)
    const result = formatLib.formatBookResponse(resultObj)

    res.send({
      message: 'Book found',
      result: result[0]
    })
  },

  async create (req, res, next)
  {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const {
        title,
        author,
        pages = null,
        releaseDate = null,
        publishingCompany = null,
      } = req.body

      const checkBookExistsWithTitle = await checkBook.checkBookExistsWithTitle(title)

      if (checkBookExistsWithTitle) {
        return res.status(400).send({
          message: 'Já existe um livro com esse titulo',
        })
      }

      const query = 'CREATE (n:Books {id:$id, title:$title, author: $author, pages: $pages, releaseDate: $releaseDate, publishingCompany: $publishingCompany}) RETURN n'
      const params = {
        id: uuid.v4(),
        title,
        author,
        pages,
        releaseDate,
        publishingCompany,
      }

      const resultObj = await graphDBConnect.executeCypherQuery(query, params)
      const result = formatLib.formatBookResponse(resultObj)
      res.status(201).send({
        message: 'Book created successfully',
        result: result[0]
      })

    } catch (error) {
      next(error)
    }

  },

  async update (req, res)
  {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      author,
      pages = null,
      releaseDate = null,
      publishingCompany = null,
    } = req.body

    const { id } = req.params

    const checkBookExists = await graphDBConnect.executeCypherQuery(`MATCH (n:Books {id: '${id}'}) RETURN n LIMIT 1`)

    if (checkBookExists.records.length <= 0) {
      return res.status(400).send({
        message: 'Livro não encontrado',
      })
    }

    const checkBookExistsWithTitle = await checkBook.checkBookExistsWithTitle(title, id)
    if (checkBookExistsWithTitle) {
      return res.status(400).send({
        message: 'Já existe um livro com esse titulo',
      })
    }

    const query = `MATCH (b:Books {id: '${id}'}) SET b = {id:$id, title:$title, author: $author, pages: $pages, releaseDate: $releaseDate, publishingCompany: $publishingCompany} RETURN b`;

    const params = {
      id,
      title,
      author,
      pages,
      releaseDate,
      publishingCompany,
    };

    const resultObj = await graphDBConnect.executeCypherQuery(query, params);
    const result = formatLib.formatBookResponse(resultObj);

    res.send({
      message: 'Book update successfully',
      result: result[0]
    })
  },

  async delete (req, res)
  {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;

    const checkBookExists = await graphDBConnect.executeCypherQuery(`MATCH (n:Books {id: '${id}'}) RETURN n LIMIT 1`)

    if (checkBookExists.records.length <= 0) {
      return res.status(400).send({
        message: 'Livro não encontrado',
      })
    }

    await graphDBConnect.executeCypherQuery(`MATCH (b:Books {id: '${id}'}) DELETE b`)

    res.status(204).end();
  }
}
