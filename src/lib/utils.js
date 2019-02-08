const fetch = require('isomorphic-fetch')
const isNil = require('lodash/isNil')
const qs = require('querystring')

const fetchApi = (url, { timeout = 30000, query, ...options } = {}) => {
  const filteredQuery = query && Object.keys(query).reduce((acc, key) => {
    const value = query[key]
    if (isNil(value) || value === '') return acc
    acc[key] = value
    return acc
  }, {})

  const queryString = filteredQuery
    ? `?${qs.stringify(filteredQuery)}`
    : ''

  return Promise.race([
    fetch(url + queryString, options).then((res) => {
      if (res.ok) {
        return res
      } else {
        throw new Error(`Status ${res.status}: ${res.statusText}`)
      }
    }),
    Promise.delay(timeout).then(() => {
      throw new Error(408)
    })
  ])
}

module.exports = {
  fetch: fetchApi
}