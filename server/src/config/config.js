module.exports = {
  modules: {
    expressWinston: {
      transports: {
        console: {
          level: 'info',
          silent: false
        }
      },
      meta: false,
      expressFormat: true
    },
    winston: {
      transports: {
        console: {
          level: 'info',
          silent: false
        }
      }
    },
    neo4j: {
      dbHost: 'bolt://localhost:7687',
      dbUser: 'neo4j',
      dbPass: 'root'
    }
  }

}