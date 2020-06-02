const fakeServer = require('../')

stress()
async function stress() {
  let server
  for(let i = 0; i < 100; i++) {
    server = await fakeServer({port: 8080, api: []});
    await server.stop();
    console.log(i)
  }
}