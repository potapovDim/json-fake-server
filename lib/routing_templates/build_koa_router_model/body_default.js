const {is_file, is_string, to_error} = require('./utils')

/**
  * @param {object} response
  * @param {string} path
  * @param {string} http_method
  * @returns {string}
*/
function build_response_default(response, path, http_method) {

  function stringify_response(item, path, method) {
    try {
      return JSON.stringify(item)
    } catch(_) {
      return to_error(path, method)
    }
  }

  if(!is_string(response)) {
    return stringify_response(response, path, http_method)
  }
  if(is_string(response) && is_file(response)) {
    return `fs.readFileSync("${response}", {'encoding': 'utf8'})`
  }
  if(is_string(response)) {
    return `"${response}"`
  }

  return JSON.stringify({data: 'default'})
}

module.exports = {
  build_response_default
}