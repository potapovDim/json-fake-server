const fakeServer = require('../index')
const fetch = require('node-fetch')
const {expect} = require('chai')

describe('Authorization', () => {
  let server = null

  afterEach(async () => {
    await server.stop()
  })

  it('authorization header Bearer', async function() {
    const model = {
      "port": 8081,
      "authorization": {"type": "headers"},
      "api": [
        {
          "method": "GET",
          "path": "/example",
          "response": {"example": "example GET"},
          "authorization": {"status": 401, "token": "testToken"}
        }
      ]
    }
    server = await fakeServer(model)
    // default unauthorized response
    const default_of_unauthorized = await fetch('http://0.0.0.0:8081/example').then((res) => res.json())
    expect(default_of_unauthorized).to.eql({unauthorized: 'unauthorized'})

    // success response
    const success_response = await fetch('http://0.0.0.0:8081/example', {
      headers: {'Authorization': 'Bearer testToken'}
    }).then((res) => res.json())
    expect(success_response).to.eql({example: 'example GET'})
  })

  it('authorization body key', async function() {
    const model = {
      "port": 8081,
      "authorization": {"type": "bodyKey"},
      "api": [
        {
          "method": "POST",
          "path": "/example",
          "response": {"example": "example GET"},
          "authorization": {"status": 401, "token": "testToken"}
        }
      ]
    }
    server = await fakeServer(model)
    // default unauthorized response
    const default_of_unauthorized = await fetch('http://localhost:8081/example', {
      method: 'POST'
    }).then((res) => res.json())
    expect(default_of_unauthorized).to.eql({unauthorized: 'unauthorized'})

    // success response
    const success_response = await fetch('http://localhost:8081/example', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({access_token: 'testToken'})
    }).then((res) => res.json())
    expect(success_response).to.eql({example: 'example GET'})
  })
})
