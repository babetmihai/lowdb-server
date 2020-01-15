const { dbPath } = process.env

import low from 'lowdb'
import FileAsync from 'lowdb/adapters/FileAsync'

const adapter = new FileAsync(dbPath)

export default low(adapter)

