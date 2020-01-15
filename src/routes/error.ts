
export default (err, req, res, next) => { // eslint-disable-line no-unused-vars
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
