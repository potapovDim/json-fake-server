const path = require('path')

module.exports = function({json_model_path}) {
  if(json_model_path) {
    json_model_path = path.resolve(process.cwd(), json_model_path)
  } else {
    json_model_path = json_model_path ? json_model_path : path.resolve(process.cwd(), './fake_server.json')
  }
  const PORT = require(json_model_path).port || 8081
  const app = require('./server_worker')(json_model_path)
  const server = app.listen(PORT)
  return server
}
