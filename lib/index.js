const path = require('path')

function get_model_file_path(file_path_or_object) {
  if(Object.prototype.toString.call(file_path_or_object) === '[object String]') {
    if(path.isAbsolute(file_path)) {
      return require(file_path)
    }
    throw new Error('json_model_path should be string: absolute path to file')
  }
  return file_path_or_object
}


module.exports = function(json_model_or_path) {

  const json_model = get_model_file_path(json_model_or_path)

  const PORT = json_model.port || 8081
  const HOST = json_model.host || '0.0.0.0'
  const {app} = require('./server_worker')(json_model)
  const server = app.listen(PORT, HOST)

  return {
    stop: () => server.close()
  }
}
