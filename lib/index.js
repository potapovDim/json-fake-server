const path = require('path')

function get_model_file_path(file_path) {
  if(Object.prototype.toString.call(file_path) === '[object String]') {
    throw new Error('json_model_path should be string absolute or relative')
  }

  if(path.isAbsolute(json_model_path)) {
    return file_path
  }

  return path.join()
}


module.exports = function({json_model_path}) {

  if(json_model_path) {
    json_model_path = path.join(process.cwd(), json_model_path)
  } else {
    json_model_path = json_model_path ? json_model_path : path.resolve(__dirname, '../misc/fake_server.json')
  }

  const PORT = require(json_model_path).port || 8081
  const app = require('./server_worker')(json_model_path)
  const server = app.listen(PORT)

  return server
}
