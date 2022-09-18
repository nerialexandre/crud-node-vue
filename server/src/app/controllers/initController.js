const graphDBConnect = require('../../config/database')
const formatLib = require('../lib/formatResponse')
const checkBook = require('../lib/checkBook')
const { validationResult } = require('express-validator')

module.exports = {

  async getAll (req, res)
  {
    const { page = 1, limit = 100 } = req.query

    const query = `MATCH (n:Books) RETURN n SKIP ${limit * (page - 1)} LIMIT ${limit}`
    const resultObj = await graphDBConnect.executeCypherQuery(query)
    const result = formatLib.formatResponse(resultObj)

    res.send({
      message: 'All Books',
      result
    })
  },

  async getOne (req, res)
  {
    const { id } = req.params
    const query = 'MATCH (n:Books {id: $id}) RETURN n LIMIT 1'
    const params = { id: parseInt(id) }
    const resultObj = await graphDBConnect.executeCypherQuery(query, params)
    const result = formatLib.formatResponse(resultObj)

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
        id,
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
        id: parseInt(id),
        title,
        author,
        pages,
        releaseDate,
        publishingCompany,
      }

      const resultObj = await graphDBConnect.executeCypherQuery(query, params)
      const result = formatLib.formatResponse(resultObj)
      res.status(201).send({
        message: 'Book created successfully',
        result
      })

    } catch (error) {
      next(error)
    }

  },

  async update (req, res)
  {
    const {
      title,
      author,
      pages = null,
      releaseDate = null,
      publishingCompany = null,
    } = req.body

    const { id } = req.params

    const checkBookExists = await graphDBConnect.executeCypherQuery(`MATCH (n:Books {id: ${id}}) RETURN n LIMIT 1`)

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

    const query = 'MATCH (b:Books {id: $id}) SET b = {id:$id, title:$title, author: $author, pages: $pages, releaseDate: $releaseDate, publishingCompany: $publishingCompany} RETURN b';

    const params = {
      id: parseInt(id),
      title,
      author,
      pages,
      releaseDate,
      publishingCompany,
    };

    const resultObj = await graphDBConnect.executeCypherQuery(query, params);
    const result = formatLib.formatResponse(resultObj);

    res.send({
      message: 'Book update successfully',
      data: result
    })
  },

  async delete (req, res)
  {
    const { id } = req.params;

    const checkBookExists = await graphDBConnect.executeCypherQuery(`MATCH (n:Books {id: ${id}}) RETURN n LIMIT 1`)

    if (checkBookExists.records.length <= 0) {
      return res.status(400).send({
        message: 'Livro não encontrado',
      })
    }

    const query = 'MATCH (b:Users {id: $id}) DELETE b';
    const params = { id: parseInt(id) };

    await graphDBConnect.executeCypherQuery(query, params);
    res.status(204).end();
  }
}
