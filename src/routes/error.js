
const withError = (handlers) => {
  return Object.keys(handlers)
    .reduce((acc, key) => ({
      ...acc,
      [key]: (req, res, next) => handlers[key](req, res, next)
        .catch((error) => next(error))
    }), {})
}

const errorHandler = (err, req, res, next) => { // eslint-disable-line no-unused-vars
  switch (true) {
    case (!err): {
      res.sendStatus(404)
      break
    }
    case (isNaN(err.message)): {
      res.sendStatus(500)
      break
    }
    default: {
      res.sendStatus(err.message)
    }
  }
}

module.exports = {
  withError,
  errorHandler
}

