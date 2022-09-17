const winston = require('winston')
const expressWinston = require('express-winston')
const helpers = require('./helpers')
const config = require('../config')

module.exports = () => {
  const logger = expressWinston.logger({
    transports: [
      new winston.transports.Console({
        level: config.modules.expressWinston.transports.console.level,
        silent: config.modules.expressWinston.transports.console.silent,
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
          }),
          winston.format.printf(helpers.formatParams)
        )
      })
    ],
    meta: config.modules.expressWinston.meta,
    expressFormat: config.modules.expressWinston.expressFormat,
    level: helpers.getStatusLevel
  })

  return logger
}
