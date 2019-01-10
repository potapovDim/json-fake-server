const fakeServer = require('../index')
const fetch = require('node-fetch')
const {expect} = require('chai')

describe('Example', () => {

  let server = null

  before(async () => {
    server = fakeServer({json_model_path: '../test.example.json'})

    await (() => new Promise((res) => {
      setTimeout(res, 1500)
    }))()
  })
  after(() => {
    server.close()
  })
  it('test', async () => {
    const responseBody = await fetch('http://localhost:8888/user').then((res) => res.json())
    expect(responseBody.user_response_success).to.eql('user_response_success')
  })
})
