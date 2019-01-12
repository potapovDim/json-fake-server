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
    server.stop()
  })
  it('test post user', asyn () => {
    const responseBody = await fetch('http://localhost:8888/user', {method: 'POST'}).then((res) => res.json())
    expect(responseBody.created).to.eql(true)
  })
  it('test get user', async () => {
    const responseBody = await fetch('http://localhost:8888/user').then((res) => res.json())
    expect(responseBody.user_name).to.eql('test user')
    expect(responseBody.user_phone).to.eql('test phone')
  })
})
```

## Model Structure

- [HTTP methods](#http-method)
- [Headers authorization](#authorization)
- [Url params](#params)
- [HTML static serveriing](#html)
- [Several server nodes in one environment](#several-server-nodes-in-one-environment)


## HTTP methods
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

## Authorization

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

## Params

```js
const fakeServer = require('test-fake-server')
const fetch = require('node-fetch')

const model = {
  "port": "8081",
  "api": [{
    "method": "GET",
    // after : name of param shoulb be used in params_response object
    // lets check :user
    "path": "/user/:user/id/:id",

    "params_response": {
      "id": {
        "value": "testId",
        "response": {
          "testId": "testId"
        }
      },
      // user
      // if user will contain /user/testUser/id/:id
      // we will get next response from user object
      "user": {
        "value": "testUser",
        "response": {
          "user": "testId"
        }
      },

      // if we have full uquals between params
      // we will get general response - response property from params_response object
      // in this case we heed
      // http://localhost:8081/user/testUser/id/testId
      "response": {
        "full_params_equal": {
          "username": "test user1",
          "password": "test password"
        }
      }
    },
    // this response will be used in other cases
    // as example http://localhost:8081/user/unknown/id/unknown
    "response": {
      "example": "example GET"
    }
  }]
}
  async function callToServer() {
  const defaultGetData = await fetch('http://localhost:8081/user/unknown/id/unknown', {method: 'GET'}).then((res) => res.text())
  // {"example": "example GET"}
  console.log(defaultGetData)

  const fullPramsEqual = await fetch('http://localhost:8081/user/testUser/id/testId', {method: 'GET'}).then((res) => res.text())
  // {"full_params_equal": {
  //   "username": "test user1",
  //   "password": "test password"
  // }}
  console.log(fullPramsEqual)

  const userEqualParamEqual = await fetch('http://localhost:8081/user/testUser/id/unknown', {method: 'GET'}).then((res) => res.text())
  // {"user": "testId"}
  console.log(userEqualParamEqual)

  const idEqualParamEqual = await fetch('http://localhost:8081/user/unknown/id/testId', {method: 'GET'}).then((res) => res.text())
  // {"testId": "testId"}
  console.log(idEqualParamEqual)
}

```
<br />
Default response
<br />
<img src="./misc/params_default.png">
<br />
Full params equal response
<br />
<img src="./misc/params_full_equal.png">
<br />
Partial equal param user
<br />
<img src="./misc/params_partial_equal_user.png">
<br />
Partial equal param id
<br />
<img src="./misc/params_partial_equal_id.png">
<br />

## HTML

```js
const fakeServer = require('test-fake-server')
const fetch = require('node-fetch')
const path = require('path')

const indexHtml = path.resolve(__dirname, './index.html')
const model = {
  "port": "8081",
  "api": [{
    "method": "GET",
    "path": "/",
    "response": indexHtml
  }]
}
async function callToServer() {
const indexHtmlText = await fetch('http://localhost:8081/', {method: 'GET'}).then((res) => res.text())
  // <html lang="en">
  //   <head>
  //     <meta charset="UTF-8">
  //     <meta name="viewport" content="width=device-width, initial-scale=1.0">
  //     <meta http-equiv="X-UA-Compatible" content="ie=edge">
  //     <title>Document</title>
  //   </head>
  //   <body>
  //     TEST FAKE SERVER
  //     <div>A</div>
  //     <div>B</div>
  //     <div>C</div>
  //     <div>D</div>
  //     <div>E</div>
  //   </body>
  //   </html>
  console.log(indexHtmlText)
}

```
<img src="./misc/html.png">

## Several server nodes in one environment
```js
const fakeServer = require('../index')
const fetch = require('node-fetch')

const model_entry_point = {
  "port": 8081,
  "api": [
    {
      "method": "GET",
      "path": "/user",

      "response_from_url": { // if this property exists this endpoint will try to use it as main
        "status": 201, // response status
        "method": "GET", // method what will use for request for other HTTP service
        "url": "http://localhost:8888/userData",  // URL to other service endpoint
        "merge_with": { // if this property exists response from URL will merged with this property value
                        // for example from http://localhost:8888/userData we will get {user: "exists"}
                        // after merge with this property value {user: "exists", part_from_entrypoint: "entry point"}
                        // so after request to http://localhost:8081/user
                        // we will get {user: "exists", part_from_entrypoint: "entry point"}
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
  const getData = await fetch('http://localhost:8081/user',
    {method: 'GET'}).then((res) => res.json())
  // {
  // part_from_user_service:
  //   { user_profile: { username: 'some username', postal_code: 3212654 } },
  //  part_from_entrypoint: 'entry point'
  //  }
  console.log(getData)
}
```

