const fakeServer = require('../')
const fetch = require('node-fetch')

const model = {
  "port": "8081",
  "api": [{
    "method": "GET",

    "path": "/user/:user/id/:id",

    "params_response": {
      "id": {
        "value": "testId",
        "response": {
          "testId": "testId"
        }
      },
      "user": {
        "value": "testUser",
        "response": {
          "testId": "testId"
        }
      },
      "response": {
        "full_params_equal": {
          "username": "test user1",
          "password": "test password"
        }
      }
    },

    "response": {
      "example": "example GET"
    }
  }]
}
const server = fakeServer()

setTimeout(() => {
  server.close()
}, 2500)

callToServer()
async function callToServer() {
  const defaultGetData = await fetch('http://localhost:8081/user/unknown/id/unknown', {method: 'GET'}).then((res) => res.json())
  // {"example": "example GET"}
  const withTokenData = await fetch('http://localhost:8081/example', {
    headers: {
      Authorization: 'Bearer testToken'
    },
    method: 'GET'
  }).then((res) => res.json())
  // {example: "example GET"}
}
