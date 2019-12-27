const db = require('../db')
const { dispatch, subscribe } = require('../events')
const uuidv1 = require('uuid/v1')

subscribe(async ({ type, payload }) => {
  if (type === 'history') {
    try {
      const id = uuidv1()
      await db().set(`history.${id}`, payload).write()
    } catch (error) {
      console.log(error.message)
    }
  }
})

const createRecord = (payload) => {
  dispatch({ type: 'history', payload })
}

module.exports = {
  createRecord
}