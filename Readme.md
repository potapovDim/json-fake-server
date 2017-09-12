#Fork and improve
## Usage

* You can start fake server
* Mock some response (GET, POST, PUT, DELETE), if you need big response - can read it from JSON file
* Stop fake server

<img src="./screen.png" width="550"/>

## Install
```sh
npm install -SD mock-backend-rest
```

```js

const FakeServer = require('mock-backend-rest');

const fakeServer = new FakeServer(8085);

fakeServer.port = 8085; //default port is 4000
fakeServer.get('/foo', './index.json'); //path to json file what will be response
fakeServer.post('/bar', {LOL: 'LOL'}); //
fakeServer.del('/foo', {LOL: 'LOL'});
fakeServer.put('/bar', {LOL: 'LOL'});
fakeServer.post('/xxx', { LOL: 'LOL' }, {error: 'SUPER CUSTOM ERROR'}, true, {a: 'a'});

fakeServer.start();

console.log(fakeServer.getGetResult('/foo')); 
//output  { called: false, callCount: 0, method: 'GET' }
//curl -d '{"key1":"value1", "key2":"value2"}' -H "Content-Type: application/json" -X POST http://localhost:8085/bar
//two times use curl and after
//curl -d '{"a": "a"}' -H "Content-Type: application/json" -X POST http://localhost:8085/xxx
//response will be {"LOL":"LOL"}
//curl -d '{"a": "1"}' -H "Content-Type: application/json" -X POST http://localhost:8085/xxx
//response will be {"error":"SUPER CUSTOM ERROR"}

setTimeout(() => {
  console.log(fakeServer.getPostResult('/bar'));
  fakeServer.stop();
  fakeServer.restore();
}, 15000);
//{ calledArgs:
//   [ { key1: 'value1', key2: 'value2' },
//     { key1: 'value1', key2: 'value2' } ],
// called: true,
// callCount: 2,
// method: 'POST' }
```

methods | args
--- | --- 
**`constructor(port, responseFormat)`** | port, any or `number`, default is 4000 , `string` 'text' or 'json' (default json)
**`get(path, response, errorResponse, assertRequestBody, requestBody)`** | path: `string` example: '/foo'; response: `object` or `string` - path to json file or string response, three last args is optiona, if you want own response error errorResponse `object`, assertRequestBody `bool` if true your response body will be assert equal with last arg requestBody `object` 
**`post(path, response, errorResponse, assertRequestBody, requestBody)`** | path: `string` example: '/foo'; response: `object`or `string` - path to json file or string response, three last args is optiona, if you want own response error errorResponse `object`, assertRequestBody `bool` if true your response body will be assert equal with last arg requestBody `object` 
**`del(path, response, errorResponse, assertRequestBody, requestBody)`** | path: `string` example: '/foo'; response: `object`  or `string` - path to json file or string response, three last args is optiona, if you want own response error errorResponse `object`, assertRequestBody `bool` if true your response body will be assert equal with last arg requestBody `object` 
**`put(path, response, errorResponse, assertRequestBody, requestBody)`** | path: `string` example: '/foo'; response: `object` or `string` - path to json file or string response, three last args is optiona, if you want own response error errorResponse `object`, assertRequestBody `bool` if true your response body will be assert equal with last arg requestBody `object` 
**`start()`** | any args
**`getDelResult(path)`** | path: `string` example '/foo', if server dont have action for this path return empty obj
**`getPutResult(path)`** | path: `string` example '/foo', if server dont have action for this path return empty obj
**`getGetResult(path)`** | path: `string` example '/foo', if server dont have action for this path return empty obj
**`getPostResult(path)`** | path: `string` example '/foo', if server dont have action for this path return empty obj
**`stop()`** | any args, if server not started - will get message, after stop you can get actions results etc
**`restore()`** | any args, server to initial conditions, if server runned it method stop it
## don`t need any dependencies

## Improvement plan
 * [x] Stop FakeServer
 * [ ] Mock request for any url
 * [ ] Read response fron any file, and any format