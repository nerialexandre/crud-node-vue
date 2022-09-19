
const graphDBConnect = require('../../config/database')


module.exports = {
  async checkBookExistsWithTitle (title, id = null)
  {
    console.log('id', id)
    const query = `MATCH (n:Books) WHERE n.title = $title ${id ? " AND n.id <> $id " : ''} RETURN n LIMIT 1`
    console.log(query)
    const params = {
      title,
      id: id
    }
    const resultObj = await graphDBConnect.executeCypherQuery(query, params)
    if (resultObj.records.length <= 0) {
      return false
    }
    return true
  }
}
