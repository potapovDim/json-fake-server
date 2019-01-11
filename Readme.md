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
      "response": {"created": true}
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
    const model = require('./test_model.json')
    server = fakeServer(model)
  })
  after(() => {
    server.close()
  })
  it('test post user', asyn () => {
    const responseBody = await fetch('http://localhost:8888/user', {method: 'POST'}).then((res) => res.json())
    expect(responseBody.user_name).to.eql('test user')
  })
  it('test get user', async () => {
    const responseBody = await fetch('http://localhost:8888/user').then((res) => res.json())
    expect(responseBody.user_name).to.eql('test user')
  })
})
```

## Model Structure

* [httpmthods](#http)
* [authorization](#authorization)
* [params](#params)


## HTTP
```js
const fakeServer = require('test-fake-server')
const fetch = require('node-fetch')
const model =
{
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

async function callToServer() {
  const postData = await fetch('http://localhost:8888/example', {method: 'POST'}).then((res) => res.json())
  // {example: "example POST"}
  const getData = await fetch('http://localhost:8888/example', {method: 'GET'}).then((res) => res.json())
  // {example: "example GET"}
  const putData = await fetch('http://localhost:8888/example', {method: 'PUT'}).then((res) => res.json())
  // {example: "example PUT"}
  const deleteData = await fetch('http://localhost:8888/example', {method: 'DELETE'}).then((res) => res.json())
  // {example: "example DELETE"}
}
```
<img src="./misc/get_example.png">

## authorization

```js
const fakeServer = require('test-fake-server')
const fetch = require('node-fetch')

const authorizationInApiObj = {
        "unauthorized": {   // this property will be used as body for respose
          "foo": "bar"      //
        },                  //
        "status": 401,      // this property will be used as unsuccess status if token is not equal
        "token":"testToken" // to this toke property value
      }

const model = {
  "port": 8081,
  "authorization": {
    "type": "headers"
  },
  "api": [
    {
      "method": "GET",
      "path": "/example",
      "response": {
        "example": "example GET"
      },
      "authorization": authorizationInApiObj // default properties is
                                             // unauthorized : {unauthorized: 'unauthorized'}
                                             // status : 401
    }
  ]
}
const server = fakeServer(model)

async function callToServer() {
  const withoutTokenData = await fetch('http://localhost:8888/example', {method: 'GET'}).then((res) => res.json())
  // {foo: "bar"}
  const withTokenData = await fetch('http://localhost:8888/example', {
    headers: {
      Authorization: 'Bearer testToken'
    },
    method: 'GET'
  }).then((res) => res.json())
  // {example: "example GET"}
}
callToServer()
```

<img src="./misc/autiruzation.png">

## params

```js
const fakeServer = require('test-fake-server')
const fetch = require('node-fetch')

const model = {
      "method": "GET",

      "path": "/user/:user/id/:id",

      "autentification": "test_token",

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
    }
  async function callToServer() {
  async function callToServer() {
  const withoutTokenData = await fetch('http://localhost:8888/example', {method: 'GET'}).then((res) => res.json())
  // {foo: "bar"}
  const withTokenData = await fetch('http://localhost:8888/example', {
    headers: {
      Authorization: 'Bearer testToken'
    },
    method: 'GET'
  }).then((res) => res.json())
  // {example: "example GET"}
  }
}
```