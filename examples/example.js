const fakeServer = require('../index')
const model = {
  "port": 8081,
  "api": [
    {
      "method": "GET",
      "path": "/example",
      "response": {
        "example": "example GET"
      }
    },
    {
      "method": "POST",
      "path": "/example",
      "response": {
        "example": "example POST"
      }
    },
    {
      "method": "DELETE",
      "path": "/example",
      "response": {
        "example": "example DELETE"
      }
    },
    {
      "method": "PUT",
      "path": "/example",
      "response": {
        "example": "example PUT"
      }
    }
  ]
}

const server = fakeServer(model)

setTimeout(() => {
  server.close()
}, 25000)