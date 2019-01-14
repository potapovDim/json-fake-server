const {is_file, is_string} = require('./utils')


/**
  * @param {object} resp_item
  * @param {string} path
  * @param {string} http_method
  * @returns {string}
*/
function build_response_default(resp_item, path, http_method) {

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

  if(!is_string(resp_item)) {
    return stringify_response(resp_item, path, http_method)
  }
  if(is_string(resp_item) && is_file(resp_item)) {
    return `fs.readFileSync("${resp_item}", {'encoding': 'utf8'})`
  }
  if(is_string(resp_item)) {
    return resp_item
  }

  return JSON.stringify({data: 'default'})
}

module.exports = {
  build_response_default
}