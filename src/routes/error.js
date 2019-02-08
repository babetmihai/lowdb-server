
const withError = (controllers) => {
  return Object.keys(controllers)
    .reduce((acc, key) => ({
      ...acc,
      [key]: (req, res, next) => controllers[key](req, res, next)
        .catch((error) => next(error))
    }), {})
}

/* eslint-disable no-unused-vars */
const errorController = (err, req, res, next) => {
  if (err && !isNaN(err.message)) {
    return res.sendStatus(err.message)
  } else {
    return res.sendStatus(404)
  }
}

module.exports = {
  withError,
  errorController
}

