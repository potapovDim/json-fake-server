## Usage


##Screenshots response
<img src="./screen.png" width="550"/>

```js

const {FakeServer} = require('test-fake-server');

FakeServer.port = 8085;
FakeServer.get('/lol', {LOL: 'LOL'})
FakeServer.start()

```

don`t need any dependencies
