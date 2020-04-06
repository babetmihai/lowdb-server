const { port, token } = process.env

const jwt = require('jsonwebtoken')
const assert = require('assert')
const axios = require('axios')

it('it should create a user and login', async () => {
  // create user
  await axios.post(
    `http://localhost:${port}/users`,
    { email: 'mihai.babet@test.com', password: 'test' },
    { headers: { 'Authorization': `Bearer ${token}` } }
  )

  // login and fetch token
  const { data } = await axios.post(
    `http://localhost:${port}/login`,
    { email: 'mihai.babet@test.com', password: 'test' }
  )

  const { email } = jwt.decode(data.token)
  assert.deepEqual(email, 'mihai.babet@test.com')
})