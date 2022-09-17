
const graphDBConnect = require('../../config/database')


module.exports = {
  async checkBookExistsWithTitle (title, id = null)
  {
    const query = `MATCH (n:Books) WHERE n.title = $title ${id ? " AND n.id <> $id " : ''} RETURN n LIMIT 1`

    const params = {
      title,
      id: parseInt(id)
    }
    const resultObj = await graphDBConnect.executeCypherQuery(query, params)
    if (resultObj.records.length <= 0) {
      return false
    }
    return true
  }
}
