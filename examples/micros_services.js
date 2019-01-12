const fakeServer = require('../index')
const fetch = require('node-fetch')

const model_entry_point = {
  "port": 8081,
  "api": [
    {
      "method": "GET",
      "path": "/user",
      "response_from_url": {
        "req_body": {},
        "req_headers": {},
        "status": 201,
        "method": "GET",
        "url": "http://localhost:8888/userData",
        "merge_with": {
          "part_from_entrypoint": "entry point"
        }
      }
    }
  ]
}

const model_user = {
  "port": 8888,
  "api": [
    {
      "method": "GET",
      "path": "/userData",
      "response": {
        "part_from_user_service": {
          "user_profile": {
            "username": "some username",
            "postal_code": 3212654
          }
        }
      }
    }
  ]
}

const entry = fakeServer(model_entry_point)
const userSerice = fakeServer(model_user)


setTimeout(() => {
  entry.stop()
  userSerice.stop()
}, 2500)

async function callToServer() {
  const getData = await fetch('http://localhost:8081/user', {method: 'GET'}).then((res) => res.json())
  // {
  // part_from_user_service:
  //   { user_profile: { username: 'some username', postal_code: 3212654 } },
  //  part_from_entrypoint: 'entry point'
  //  }
  console.log(getData)

}
callToServer()