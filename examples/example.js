const FakeServer = require('./index');

FakeServer.stop()
FakeServer.port = 8085;
FakeServer.get('/lol', './index.json');
FakeServer.post('/xxx', { LOL: 'LOL' });
FakeServer.post('/new', { LOLNEW: 'LOLNEW' });
FakeServer.start();


console.log(FakeServer.getGetResult('/lol'));
console.log(FakeServer.getPostResult('/xxx'));
setTimeout(() => {
  console.log(FakeServer.getPostResult('/xxx'))
  FakeServer.stop();
}, 100);
