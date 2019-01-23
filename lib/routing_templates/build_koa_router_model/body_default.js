const {is_file, is_string} = require('./utils')

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
      throw new Error(
        'Something went wrong with response data' +
        `Please check item with path: ${path} where method is: ${method}`
      )
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