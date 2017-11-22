## Usage

* Build simple fake server with routing, query, assert request bodies etc
* GET, POST, PUT, DELETE, supported methods, custom response status, if you need large response - can read it from JSON file
* Or run static

![npm downloads](https://img.shields.io/npm/dm/test-fake-server.svg?style=flat-square)

## Install
```sh
npm install -SD test-fake-server || npm i -g test-fake-server
```

If serve static run 'test-fake-serve 5678' in dir where index.html

Or in package.json file
```json
 "scripts": {
       "dev": "test-fake-server" 
    }
```
```sh
npm run dev 5678 #port
```


# Base example

```js

const FakeServer = require('test-fake-server');

const fakeServer = new FakeServer(8085)
fakeServer.post({
  path: '/foo',
  successStatus: 200,
  errorStatus: 401,
  errorResponse: { error: 'ERROR' },
  queryAndBodyResponse: { foo: 'foo' },
  assertQueryAndBody: true,
  requestBody: { a: 'a' },
  requestQuery: 'a=b&c=d'
});

fakeServer.get({ path: '/bar', response: { bar: 'bar' } });

fakeServer.start();
//foo
//curl -d '{"a": "a"}' -H "Content-Type: application/json" -X POST http://localhost:8085/foo?a=b&c=d
//output {"foo":"foo"}
//curl -d '{"a": "a"}' -H "Content-Type: application/json" -X POST http://localhost:8085/foo
//output {"error":"ERROR"}

//bar with base args every time will get {"bar": "bar"}
//curl -H "Content-Type: application/json" -X GET http://localhost:8085/bar
//output {"bar": "bar"}
//curl -H "Content-Type: application/json" -X GET http://localhost:8085/bar?foo=bar
//output {"bar": "bar"}

setTimeout(() => {
  const fooCallResult = fakeServer.getPostResult('/foo');
  console.log(fooCallResult)
  /*
   * fooCallResult type object
   * props: {
   *  called: bool 
   *  callCount: number
   *  method: string
   *  calledWithArgs: func   
   * }
   */
  fooCallResult.calledWithArgs({ a: 'a' }); //true
  fooCallResult.calledWithArgs([{ a: 'a' }, { a: 'a' }]); //true
  fooCallResult.calledWithArgs([{ a: 'a' }, { a: 'a' }, { b: 'b' }]); //false
  fakeServer.stop();
}, 20000);
```
path string '/foo', '/bar' etc
methods | args
--- | --- 
**`constructor(port, responseFormat)`** | port, any or `number`, default is 4000 , `string` 'text' or 'json' (default json)
**`get(argObj)`** |[argObj](#argobj)  
**`post(argObj)`** |[argObj](#argobj)  
**`del(argObj)`** | [argObj](#argobj) 
**`put(argObj)`** |[argObj](#argobj)  
**`start()`** | any args
**`getDelResult(path)`** | path: `string` example '/foo', return [calledActionObject](#calledactionobject), if server don`t have action, for this path return warning string
**`getPutResult(path)`** | path: `string` example '/foo',  return [calledActionObject](#calledactionobject) ,if server dont have action for this path return warning string
**`getGetResult(path)`** | path: `string` example '/foo',  return [calledActionObject](#calledactionobject) ,if server dont have action for this path return warning string
**`getPostResult(path)`** | path: `string` example '/foo',  return [calledActionObject](#calledactionobject) ,if server dont have action for this pathreturn warning string
**`stop()`** | stop server, but you can find calls
**`restore()`** | back server to initial state (clear all pathes, args etc)
**`calledWithArg(arg)`** | called from result of action, arg `object ` or `array` return true if you call this path with arg or args 

## calledActionObject
```
  calledActionObject = {
   called: bool // true if rout with method is called
   callCount: number // default 0, ++ after call
   method: string // one of 'POST', 'GET', 'PUT', 'DELETE'
   calledWithArgs: func 
  }
```
## argObj
```

```


## Improvement plan
 * [x] Stop FakeServer
 * [x] Mock request for any url (partly) (make for http, and https)
 * [x] Add custom statuses
 * [ ] Read response fron any file, and any format