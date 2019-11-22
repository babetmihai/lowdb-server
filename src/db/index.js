
const low = require('lowdb')
const FileAsync = require('lowdb/adapters/FileAsync')

let db

module.exports =  {
  db: () => db,
  init: async ({ dbPath }) => {
    const adapter = new FileAsync(dbPath)
    db = await low(adapter)
  }
}

