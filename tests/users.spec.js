const jwt = require('jsonwebtoken')
const assert = require('assert')
const fetch = require('isomorphic-fetch')
const { port } = process.env

it('it should create a user auth flow', async () => {
  await fetch(`http://localhost:${port}/users`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: 'mihai.babet@gmail.com',
      password: 'admin'
    })
  })
    .then((res) => res.json())

  const { token } = await fetch(`http://localhost:${port}/login`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: 'mihai.babet@gmail.com',
      password: 'admin'
    })
  })
    .then((res) => res.json())

  const { email } = jwt.decode(token)
  assert.deepEqual(email, 'mihai.babet@gmail.com')
})