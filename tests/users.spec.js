const { port } = process.env

const jwt = require('jsonwebtoken')
const assert = require('assert')
const axios = require('axios')

it('it should create a user and login', async () => {
  await axios.post(`http://localhost:${port}/users`,  {
    email: 'mihai.babet@gmail.com',
    password: 'admin'
  })
  const { data } = await axios.post(`http://localhost:${port}/login`, {
    email: 'mihai.babet@gmail.com',
    password: 'admin'
  })
  const { token } = data
  const { email } = jwt.decode(token)
  assert.deepEqual(email, 'mihai.babet@gmail.com')
})