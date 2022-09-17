module.exports = {
  formatResponse  (resultObj) {
    const result = []
    if (resultObj.records.length > 0) {
      resultObj.records.forEach(record => {
        result.push(record._fields[0].properties)
      })
    }
    return result
  }
}
