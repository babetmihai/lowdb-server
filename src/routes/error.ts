
export default (err, req, res, next) => { // eslint-disable-line no-unused-vars
  switch (true) {
    case (!err): {
      res.status(404).send(err)
      break
    }
    case (isNaN(err.message)): {
      res.status(500).send(err)
      break
    }
    default: {
      res.status(err.message).send(err)
    }
  }
}
