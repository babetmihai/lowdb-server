const EventEmitter = require('events').EventEmitter
const emitter = new EventEmitter
const _ = require('lodash')

const handlers = []
const resolvers = {}

emitter.on('event', (action) => {
  _.get(resolvers, action.type, []).forEach((resolve) => resolve(action))
  _.unset(resolvers, action.type)
  handlers.forEach((handler) => handler(action))
})

module.exports = {
  subscribe: (handler) => handlers.push(handler),
  dispatch: (action) => emitter.emit('event', action),
  take: (type) => new Promise((resolve) => {
    _.update(resolvers, type, (list = []) => [...list, resolve])
  })
}
