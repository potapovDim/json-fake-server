const FakeServer = require('../index');


const fakeServer = new FakeServer(8085)


fakeServer.stop()
fakeServer.port = 8085;
fakeServer.get('/lol', '../index.json');
fakeServer.post('/xxx', { LOL: 'LOL' });
fakeServer.post('/new', { LOLNEW: 'LOLNEW' });
fakeServer.start();


console.log(fakeServer.getGetResult('/lol'));
console.log(fakeServer.getPostResult('/xxx'));
setTimeout(() => {
  console.log(fakeServer.getPostResult('/xxx'))
  fakeServer.stop();
  fakeServer.restore();
}, 10000);
