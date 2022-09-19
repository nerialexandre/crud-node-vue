module.exports = {
  formatBookResponse (resultObj)
  {
    const result = []
    if (resultObj.records.length > 0) {
      resultObj.records.forEach(record =>
      {
        const {
          id,
          title,
          author,
          pages = null,
          releaseDate = null,
          publishingCompany = null,
        } = record._fields[0].properties

        result.push({
          id,
          title,
          author,
          pages,
          releaseDate,
          publishingCompany,
        })
      })
    }
    return result
  }
}
