const fetch = require('isomorphic-fetch')
const { port, token } = process.env

it('it should get a user auth flow', async () => {
  await fetch(`http://localhost:${port}/items`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      name: 'test1'
    })
  })
    .then((res) => res.json())
})