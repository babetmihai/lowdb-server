const { dbPath } = process.env

import low from 'lowdb'
import FileAsync from 'lowdb/adapters/FileAsync'


let instance
export const init = async () => {
  const adapter = new FileAsync(dbPath)
  instance = await low(adapter)
}
export default () => instance

