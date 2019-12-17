
const fakeServer = require('../')
const model = {
  port: 9090,
  api: [{
    method: "GET",
    path: "/",
    response: function({}) {

    }
  }]
}
const server = fakeServer(model)
// open browser
// url 'http://localhost:9090/
setTimeout(() => {
  server.stop()
}, 25000)