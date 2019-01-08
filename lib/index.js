const app = require('./server_worker')
const PORT = 8081

const server = app.listen(PORT)

console.log('server start on port ' + PORT)
