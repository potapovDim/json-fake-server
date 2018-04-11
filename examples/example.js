const FakeServer = require('../index');

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
  // fakeServer.stop();
}, 20000);
