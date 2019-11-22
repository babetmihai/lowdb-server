const axios = require('axios')
const { port, token } = process.env

it('it should create an item', async () => {
  await axios.post(
    `http://localhost:${port}/items`,
    { name: 'test1' },
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  )
})