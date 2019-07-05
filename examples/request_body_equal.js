const fakeServer = require('../')
const fetch = require('node-fetch')

const model_obj = {
  "port": "8081",
  "api": [{
    "method": "POST",
    "path": "/test",
    "request_body_equal": {
      "status": 404,
      "expected_body": {
        "username": "test_",
        "password": "test_pass"
      }
    },
    "response": {
      "success": true
    }
  }]
}

callToServer()

const serser = fakeServer(model_obj)

setTimeout(() => {
  serser.stop()
}, 2500)

async function callToServer() {

  const body_equal_success = await fetch('http://localhost:8081/test', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      "username": "test_",
      "password": "test_pass"
    })
  }).then((res) => res.text())
  // {"success":true}
  console.log(body_equal_success)
  const body_not_equal = await fetch('http://localhost:8081/test', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      "username": "test_1",
      "password": "test_pass"
    })
  }).then((res) => res.text())
  // {"data":"invalid request"}
  console.log(body_not_equal)
}