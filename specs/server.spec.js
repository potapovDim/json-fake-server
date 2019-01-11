const fakeServer = require('../index')
const fetch = require('node-fetch')
const {expect} = require('chai')

describe('Example', () => {

  let server = null

  before(async () => {
    const data = require('../misc/test.example1.json')
    server = fakeServer(data)
  })
  after(() => {
    server.close()
  })
  it('test', async () => {
    const responseBody = await fetch('http://localhost:8888/user').then((res) => res.json())
    expect(responseBody.user_response_success).to.eql('user_response_success')
  })
})
