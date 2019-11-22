
const withError = (handlers) => {
  return Object.keys(handlers)
    .reduce((acc, key) => ({
      ...acc,
      [key]: (req, res, next) => handlers[key](req, res, next)
        .catch((error) => next(error))
    }), {})
}

const errorHandler = (err, req, res, next) => { // eslint-disable-line no-unused-vars
  if (!err) return res.sendStatus(404)
  if (isNaN(err.message)) return res.sendStatus(500)
  return res.sendStatus(err.message)
}

module.exports = {
  withError,
  errorHandler
}

