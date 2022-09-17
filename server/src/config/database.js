const neo4j = require('neo4j-driver')
const config = require('./config')
const uri = config.modules.neo4j.dbHost
const user = config.modules.neo4j.dbUser
const password = config.modules.neo4j.dbPass

const driver = neo4j.driver(uri, neo4j.auth.basic(user, password), {
  maxConnectionLifetime: 3 * 60 * 60 * 1000, // 3 hours
  maxConnectionPoolSize: 50,
  connectionAcquisitionTimeout: 2 * 60 * 1000, // 120 seconds
  disableLosslessIntegers: true
})

async function executeCypherQuery (statement, params = {}) {
  try {
    const session = driver.session({
      database: 'neo4j'
    })

    const result = await session.run(statement, params)
    session.close()
    return result
  } catch (error) {
    console.log('erro')
  }
}

module.exports = { executeCypherQuery }