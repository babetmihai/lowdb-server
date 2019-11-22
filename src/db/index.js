const { dbPath } = process.env

const low = require('lowdb')
const FileAsync = require('lowdb/adapters/FileAsync')

let instance
const db = () => instance
db.init = async () => {
  const adapter = new FileAsync(dbPath)
  instance = await low(adapter)
  return instance
}

module.exports = db
