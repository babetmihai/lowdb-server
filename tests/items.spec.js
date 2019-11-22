const { port, token } = process.env

const axios = require('axios')
const assert = require('assert')

it('it should create and list items', async () => {
  await axios.post(
    `http://localhost:${port}/items`,
    { name: 'test1' },
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  )
  const { data } = await axios.get(`http://localhost:${port}/items`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  const { name } = Object.values(data)[0]
  assert.deepEqual(name, 'test1')
})
