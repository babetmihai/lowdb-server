const { port } = process.env

const jwt = require('jsonwebtoken')
const assert = require('assert')
const axios = require('axios')

it('it should create a user auth flow', async () => {
  await axios.post(`http://localhost:${port}/users`,  {
    email: 'mihai.babet@gmail.com',
    password: 'admin'
  })

  const response = await axios.post(`http://localhost:${port}/login`, {
    email: 'mihai.babet@gmail.com',
    password: 'admin'
  })
  const { data: { token } } = response
  const { email } = jwt.decode(token)
  assert.deepEqual(email, 'mihai.babet@gmail.com')
})