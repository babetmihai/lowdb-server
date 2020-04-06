const { dbPath } = process.env

const low = require('lowdb')
const FileAsync = require('lowdb/adapters/FileAsync')

let connection
const getConnection = async () => {
  if (!connection) {
    const adapter = new FileAsync(dbPath)
    connection = await low(adapter)
  }

  return connection
}

module.exports = {
  getConnection
}