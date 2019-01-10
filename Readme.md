## Usage

* Build simple fake server with routing, params, static content
* GET, POST, PUT, DELETE, supported methods, status, bodies etc

![npm downloads](https://img.shields.io/npm/dm/test-fake-server.svg?style=flat-square)

## Install
```sh
npm install -SD test-fake-server || npm i -g test-fake-server
```

## Example
./test_model.json
```json
{
  "port": 8888,
  "api": [
    {
      "method": "GET",
      "path": "/user",
      "response": {
        "user_name": "test user",
        "user_phone: "test phone"
      }
    },
    {
      "method": "POST",
      "path": "/user",
      "response": {
        "created": true
      }
    }
  ]
}
```
mocha test example

```js
const fakeServer = require('test-fake-server')
const fetch = require('node-fetch')
const {expect} = require('chai')

describe('Example', () => {
  let server = null
  before(() => {
    server = fakeServer({json_model_path: './test_model.json'})
  })
  after(() => {
    server.close()
  })
  it('test get user', async () => {
    const responseBody = await fetch('http://localhost:8888/user').then((res) => res.json())
    expect(responseBody.user_name).to.eql('test user')
  })
})


```