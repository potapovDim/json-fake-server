#Fork and improve
## Usage




<img src="./screen.png" width="550"/>

```js

const {FakeServer} = require('test-fake-server');

FakeServer.port = 8085; //default port is 4000
FakeServer.get('/foo', {LOL: 'LOL'}); 
FakeServer.post('/bar', {LOL: 'LOL'});
FakeServer.delete('/foo', {LOL: 'LOL'});
FakeServer.put('/bar', {LOL: 'LOL'});

FakeServer.start()

```

methods | args
--- | ---
**`get`** | path: `string` example: '/foo'; response: `object` example {LOL: 'LOL'}
**`post`** | path: `string` example: '/foo'; response: `object` example {LOL: 'LOL'}
**`delete`** | path: `string` example: '/foo'; response: `object` example {LOL: 'LOL'}
**`put`** | path: `string` example: '/foo'; response: `object` example {LOL: 'LOL'}
**`start`** | any args
**`port`** | setter, any or number, default is 4000

don`t need any dependencies
