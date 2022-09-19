
const moment = require('moment')
const validator = require('validator')

module.exports = {
    isDateOnly: date => {
      return !!validator.isISO8601(date) && moment(date, 'YYYY-MM-DD').isValid()
    },
  
}
